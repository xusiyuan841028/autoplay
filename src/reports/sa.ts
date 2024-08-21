declare const SHOPLAZZA: any;

interface Result {
  message: string;
  extra: any;
}

async function pingByImage(url: string): Promise<Result> {
  return new Promise(function (resolve, reject) {
    const result: Result = {} as Result;
    const img = new Image();
    img.onerror = img.onload = function (e: string | Event) {
      result.extra = {
        duration: Date.now() - start,
        entry: performance.getEntries().filter((e) => e.name === url)[0],
      };
      if ((e as Event).type === 'error') {
        result.message = `img.src can't connect to sa server: ${url}`;
        reject(result);
      } else {
        result.message = `img.src can connect to sa server: ${url}`;
        resolve(result);
      }
    };
    const start = Date.now();
    img.src = url;
  });
}

function responseToJSON(response: Response): Record<string, any> {
  return {
    ok: response.ok,
    status: response.status,
    url: response.url,
  };
}

async function pingByFetch(url: string): Promise<Result> {
  const start = Date.now();
  return fetch(url)
    .then((response) => {
      return {
        message: `fetch() can connect to sa server: ${url}`,
        extra: {
          duration: Date.now() - start,
          response: responseToJSON(response),
        },
      };
    })
    .catch((error) => {
      throw {
        message: `fetch() can\'t connect to sa server: ${url}`,
        extra: {
          duration: Date.now() - start,
          error,
        },
      };
    });
}

try {
  const prefix = '[SA DATA] ';
  const testUrl = SHOPLAZZA.sa_server_url.replace(/\/sa\?/, '/sa.gif?');
  const backupUrls = ['oxrpnh7aefzpi6pi.myshoplaza.com'].map((url) => testUrl.replace('r.shoplazza.com', url));

  window.addEventListener(
    'load',
    async function () {
      const results = await Promise.allSettled([
        pingByImage(testUrl),
        pingByFetch(testUrl),
        ...backupUrls.map((url) => pingByImage(url)),
      ]);

      if (results.some((r) => r.status === 'rejected')) {
        const pair = results.reduce(
          (pair, r) => {
            const error = r.status === 'rejected';
            const value = r.status === 'fulfilled' ? r.value : r.reason;
            pair[0].push(value.message);
            pair[1].push({ ...value.extra, error });
            return pair;
          },
          [[], []] as [string[], any[]],
        );
        (window as any).Raven?.captureException(new Error(prefix + pair[0].join('; ')), { extra: pair[1] });
      }
    },
    false,
  );
} catch (e) {}

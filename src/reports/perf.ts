function reportBySentry(message: string, extra: any = {}) {
  (window as any).Raven?.captureException(new Error('[PERF] ' + message), { extra });
}

function getConnection() {
  const connection = (window.navigator as any)?.connection;

  if (connection) {
    const { effectiveType, downlink, rtt } = connection;
    return { effectiveType, downlink, rtt };
  } else {
    return null;
  }
}

if (window.performance && window.performance.getEntries && (window as any).Raven) {
  const entries = performance.getEntriesByType('resource').filter((entry) => entry.duration > 4000);
  if (entries.length > 0) {
    reportBySentry('The elapsed time of some requests are too long!', { entries, connect: getConnection() });
  }

  if (window.PerformanceObserver) {
    const observer = new PerformanceObserver((list, observer) => {
      let entries = list.getEntriesByType('resource').filter((entry) => entry.duration > 4000);
      if (entries.length > 0) {
        reportBySentry('The elapsed time of some requests are too long!', { entries, connect: getConnection() });
      }
      entries = list.getEntriesByType('longtask').filter((entry) => entry.duration > 600);
      if (entries.length > 0) {
        reportBySentry('The elapsed time of some js task are too long!', { entries, connect: getConnection() });
      }
    });
    observer.observe({
      entryTypes: ['resource', 'longtask'],
    });
  }
}

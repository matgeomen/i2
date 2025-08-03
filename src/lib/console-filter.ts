// Filter out Sentry logs in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalConsoleLog = console.log;
  const originalConsoleWarn = console.warn;
  const originalConsoleError = console.error;

  console.log = (...args) => {
    if (args.some(arg => typeof arg === 'string' && arg.includes('Sentry Logger'))) {
      return;
    }
    originalConsoleLog.apply(console, args);
  };

  console.warn = (...args) => {
    if (args.some(arg => typeof arg === 'string' && (arg.includes('Sentry') || arg.includes('replayIntegration')))) {
      return;
    }
    originalConsoleWarn.apply(console, args);
  };

  console.error = (...args) => {
    if (args.some(arg => typeof arg === 'string' && (arg.includes('Sentry') || arg.includes('replayIntegration')))) {
      return;
    }
    originalConsoleError.apply(console, args);
  };
}
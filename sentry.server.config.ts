/**
 * Sentry — serwer (Route Handlers, Server Components).
 * Aktywne tylko gdy NEXT_PUBLIC_SENTRY_DSN jest ustawiony.
 */
import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
    beforeSend(event) {
      if (event.request?.data) {
        delete event.request.data;
      }
      return event;
    },
  });
}

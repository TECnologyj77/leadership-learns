import { captureAnalyticsEvent } from './client';

export type ContactClickLocation =
  | 'navbar'
  | 'footer'
  | 'home_final'
  | 'corporate_hero'
  | 'corporate_footer'
  | 'individual_hero'
  | 'individual_footer'
  | 'about_footer';

export const captureContactClicked = (location: ContactClickLocation): void => {
  captureAnalyticsEvent('contact_clicked', {
    method: 'contact_page',
    location,
  });
};

export const captureContactFormSubmitted = (): void => {
  captureAnalyticsEvent('contact_form_submitted');
};

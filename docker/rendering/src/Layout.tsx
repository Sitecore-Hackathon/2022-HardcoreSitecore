import React, { useState } from 'react';
import Head from 'next/head';
import deepEqual from 'deep-equal';
import Navigation from './Navigation';
// import { useI18n } from 'next-localization';
import {
    Placeholder,
    VisitorIdentification,
    withSitecoreContext,
    getPublicUrl,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { StyleguideSitecoreContextValue } from 'lib/component-props';
// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = getPublicUrl();
// This is boilerplate navigation for sample purposes. Most apps should throw this away and use their own navigation implementation.
// Most apps may also wish to use GraphQL for their navigation construction; this sample does not simply to support disconnected mode.

interface LayoutProps {
    sitecoreContext: StyleguideSitecoreContextValue;
}
const Layout = ({ sitecoreContext: { route } }: LayoutProps): JSX.Element => {
    const [subscribed, setSubscription] = useState(false);
    const registerUser = async event => {
        event.preventDefault();
        const res = await fetch('https://api.moosend.com/v3/subscribers/04254003-bc95-48fd-8761-4511e2c7f01e/subscribe.json?apikey=ccdd5266-5ba3-454f-9ff7-ca76b6741b19', {
            body: JSON.stringify({
                name: event.target.name.value,
                email: event.target.email.value
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST'
        })
        const result = await res.json();
        console.log(result);
        setSubscription(true);
    }
    return (
        <>
            <Head>
                <title>{route?.fields?.pageTitle?.value || 'Page'}</title>
                <link rel="icon" href={`${publicUrl}/favicon.ico`} />
            </Head>
            {/*
        VisitorIdentification is necessary for Sitecore Analytics to determine if the visitor is a robot.
        If Sitecore XP (with xConnect/xDB) is used, this is required or else analytics will not be collected for the JSS app.
        For XM (CMS-only) apps, this should be removed.
        VI detection only runs once for a given analytics ID, so this is not a recurring operation once cookies are established.
      */}
            <VisitorIdentification />
            <Navigation />
            {/* root placeholder for the app, which we add components to using route data */}
            <div className="container">
              <Placeholder name="jss-main" rendering={route} />
              {!subscribed && (
                  <form id="SubscribeForm" onSubmit={registerUser}>
                      <strong>Subscribe for product alerts!</strong>
                      <label htmlFor="name">Full Name</label>
                      <input id="name" name="name" type="text" placeholder='name' autoComplete="name" required />
                      <label htmlFor="email">Email</label>
                      <input id="email" name="email" type="text" placeholder='email' required />
                      <button type="submit">Register</button>
                  </form>
              )}
              {subscribed && (
                  <p>Thank you for subscribing</p>
              )}
            </div>
        </>
    );
};
const propsAreEqual = (prevProps: LayoutProps, nextProps: LayoutProps) => {
    if (deepEqual(prevProps.sitecoreContext.route, nextProps.sitecoreContext.route)) return true;
    return false;
};
export default withSitecoreContext()(React.memo(Layout, propsAreEqual));
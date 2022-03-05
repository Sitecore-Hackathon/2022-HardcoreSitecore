import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import deepEqual from 'deep-equal';
// import { useI18n } from 'next-localization';
import {
    Placeholder,
    VisitorIdentification,
    withSitecoreContext,
    getPublicUrl,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { StyleguideSitecoreContextValue } from 'lib/component-props';
import { useOcDispatch, useOcSelector } from './ordercloud/redux/ocStore'
import logout from './ordercloud/redux/ocAuth/logout'

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = getPublicUrl();

// This is boilerplate navigation for sample purposes. Most apps should throw this away and use their own navigation implementation.
// Most apps may also wish to use GraphQL for their navigation construction; this sample does not simply to support disconnected mode.
const Navigation = () => {
    // const { t } = useI18n();

    const dispatch = useOcDispatch()
    const { user, isAnonymous, loading, lineItemCount } = useOcSelector((s) => ({
        user: s.ocUser.user,
        loading: s.ocAuth.loading,
        isAnonymous: s.ocAuth.isAnonymous,
        lineItemCount: s.ocCurrentOrder.order ? s.ocCurrentOrder.order.LineItemCount : 0,
    }))

    return (
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom">
            <h5 className="my-0 mr-md-auto font-weight-normal">
                <Link href="/">
                    <a className="text-dark">
                        <img src={`${publicUrl}/sc_logo.svg`} alt="Sitecore" />
                    </a>
                </Link>
            </h5>
            <nav className="my-2 my-md-0 mr-md-3">
                <Link href="/">
                    <a>Home</a>
                </Link>
                <Link href="/cart">
                    <a>Cart</a>
                </Link>
                <Link href="/products">
                    <a>Products</a>
                </Link>
                {isAnonymous ? (
                    <Link href="/login">
                        <a>Login</a>
                    </Link>
                ) : (
                    <button type="button" disabled={loading} onClick={() => dispatch(logout())}>
                        Logout
                    </button>
                )}
                {!isAnonymous && user && <p>{`${user.FirstName} ${user.LastName}`}</p>}
            </nav>
        </div>
    );
};

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
            </div>

            {!subscribed && (
                <form id="SubscribeForm" onSubmit={registerUser}>
                    <label htmlFor="name">Full Name</label>
                    <input id="name" name="name" type="text" autoComplete="name" required />
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="text" required />
                    <button type="submit">Register</button>
                </form>
            )}
            {subscribed && (
                <p>Thank you for subscribing</p>
            )}

        </>
    );
};

const propsAreEqual = (prevProps: LayoutProps, nextProps: LayoutProps) => {
    if (deepEqual(prevProps.sitecoreContext.route, nextProps.sitecoreContext.route)) return true;

    return false;
};

export default withSitecoreContext()(React.memo(Layout, propsAreEqual));

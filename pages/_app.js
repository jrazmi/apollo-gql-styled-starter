import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Theme, AddGlobals } from '../theme';
import { Meta } from '../components/Global';

class Application extends App {
  render () {
    const { Component, pageProps } = this.props;
    return (
            <ThemeProvider theme={Theme}>
                <Meta/>
                <AddGlobals/>
                <Component {...pageProps} />
            </ThemeProvider>

    )
  }
}

export default Application
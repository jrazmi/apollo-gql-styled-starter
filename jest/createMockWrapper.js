import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components'
import { Theme, AddGlobals } from '../theme';
import { mount } from 'enzyme';
import { Meta } from '../components/Global';
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../server/fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

export const CreateMockWrapper = (mocks, Component) => {
    const wrapper = mount(
        <MockedProvider mocks={mocks} addTypename={false} cache={new InMemoryCache({addTypename: false, fragmentMatcher})}>
            <ThemeProvider theme={Theme}>
                <Meta/>
                <AddGlobals/>
                {Component}
            </ThemeProvider>
        </MockedProvider>
    );
    return wrapper;
}
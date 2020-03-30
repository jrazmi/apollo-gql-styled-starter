import { act } from 'react-dom/test-utils';
import { CreateMockWrapper } from '../jest';
import { Status, GET_STATUS } from '../pages/status';
import wait from 'waait';


const successMocks = [
  {
    request: {
      query: GET_STATUS,
      
    },
    result: () => {
      return {
        data: {
          status: 'ok',
        },
      }
    },
  },
];

const errorMocks = [
  {
    request: {
      query: GET_STATUS,
      
    },
    result: () => {
      return {
        error: {
            errors: [
                {
                    message: "failed"
                }
            ]
        }
      }
    },
  },
];


describe('<Status/>', () => {
    it('it renders a loading message and then status ok', async () => {
        await act( async () => {
            const wrapper = CreateMockWrapper(successMocks, <Status/>);
            expect(wrapper.find('.loading').exists()).toBe(true);
            await wait(0);
            wrapper.update();
            expect(wrapper.find('.status').exists()).toBe(true);
        })
    });
    it('it renders an error message when bad query', async () => {
        await act( async () => {
            const wrapper = CreateMockWrapper(errorMocks, <Status/>);
            await wait(0);
            wrapper.update();
            expect(wrapper.find('.error').exists()).toBe(true);
        })
    });
})
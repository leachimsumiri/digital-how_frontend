import { shallowMount } from '@vue/test-utils';
import Companies from '@/components/Companies.vue';
import { BTable } from 'bootstrap-vue';

describe('Companies.vue', () => {
  it('renders subcomponents', () => {
    const testProps = {
      data: [{
        id: 1,
        description: 'Moon Studios',
        url: 'https://www.orithegame.com/moon-studios/',
        association: false,
      }],
    };

    const wrapper = shallowMount(Companies, {
      propsData: { testProps },
    });

    const tableWrapper = wrapper.findComponent(BTable);

    expect(tableWrapper.exists()).toBe(true);
  });
});

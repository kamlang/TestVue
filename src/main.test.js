import { mount, flushPromises } from '@vue/test-utils'
import App from './App.vue';
import { describe, it, expect, vi } from "vitest";
import axios from 'axios'

let mockData =  { data : { "login": "defunkt" }}
// vi.spyOn(axios,'get').mockResolvedValue(mockData)

describe("Test if elements are rendered and removed correctly from the DOM.", () => {
    it("Tests the rendering of multiple cards.", async () => {
    axios.get = vi.fn()
            .mockImplementationOnce(() => mockData )
            .mockImplementationOnce(() => { return {data : { "login": "kamlang" }}})

        const wrapper = mount(App)
        const input = wrapper.get('[data-test-id="username-input"]')
        const submit= wrapper.get('[data-test-id="username-submit"]')

        await input.setValue("defunkt")
        await wrapper.find('button').trigger("click")
        await flushPromises()

        expect(axios.get).toHaveBeenCalledTimes(1)

        await input.setValue("kamlang")
        await wrapper.find('button').trigger("click")
        await flushPromises()

        expect(axios.get).toHaveBeenCalledTimes(2)

        const userlogins = await wrapper.findAll('[data-test-id="username-test"]')

        expect(userlogins.at(0).text()).toBe("defunkt")
        expect(userlogins.at(1).text()).toBe("kamlang")

    })
    it("Tests if cards are removed correctly from the DOM.", async () => {
        axios.get = vi.fn(() => mockData)

        const wrapper = mount(App)
        const input = wrapper.get('[data-test-id="username-input"]')
        const clear = wrapper.get('[data-test-id="username-clear"]')
        const submit= wrapper.get('[data-test-id="username-submit"]')

        await input.setValue("defunkt")
        await submit.trigger("click")
        await flushPromises()
        await clear.trigger("click")

        const userlogins = await wrapper.findAll('[data-test-id="username-test"]')
        expect(userlogins.at(0)).not.exist

    })

    it("testing unexisting user", async () =>{
    axios.get = vi.fn()
            .mockImplementationOnce(() => { throw "Error"} )
        const wrapper = mount(App)
        const input = wrapper.get('[data-test-id="username-input"]')
        const submit= wrapper.get('[data-test-id="username-submit"]')

        await input.setValue("sfksfhslkf9fsfsfsf5454fsfs")
        await submit.trigger("click")
        await flushPromises()

        expect(wrapper.vm.userFound).toBe(false)
        let warningButton = await wrapper
            .find('[data-test-id="warning-notexists-close"]')

        expect(warningButton.exists()).toBe(true)
        await warningButton.trigger("click")
        expect(wrapper.vm.userFound).toBe(true)

        warningButton = await wrapper
            .find('[data-test-id="warning-notexists-close"]')
        expect(warningButton.exists()).toBe(false)
    })
  });

// @ts-check
const {test} = require("../../fixtures");
const {expect} = require("@playwright/test");

test.describe('Test Cases Foo', () => {
    test("Test #1", async ({page}) => {
        // visit the site
        await page.goto('https://bstackdemo.com/');

        // get name of product we want to add to cart\
        const productToAdd = await page.locator('#\\33  > p').textContent();

        // click on add to cart
        await page.click('#\\33 > .shelf-item__buy-btn');

        // get name of item in cart
        const productInCart = await page.textContent('#__next > div > div > div.float-cart.float-cart--open > div.float-cart__content > div.float-cart__shelf-container > div > div.shelf-item__details > p.title');

        // check if product in cart is same as one added
        expect(productInCart).toEqual(productToAdd);
    });

    test("Test #2", async ({page}) => {
        // visit the site
        await page.goto('https://bstackdemo.com/');

        // get name of product we want to add to cart\
        const productToAdd = await page.locator('#\\33  > p').textContent();

        // click on add to cart
        await page.click('#\\33 > .shelf-item__buy-btn');

        // get name of item in cart
        const productInCart = await page.textContent('#__next > div > div > div.float-cart.float-cart--open > div.float-cart__content > div.float-cart__shelf-container > div > div.shelf-item__details > p.title');

        // check if product in cart is same as one added
        expect(productInCart).toEqual(productToAdd);
    });

    test("Test #3", async ({page}) => {
        // visit the site
        await page.goto('https://bstackdemo.com/');

        // get name of product we want to add to cart\
        const productToAdd = await page.locator('#\\33  > p').textContent();

        // click on add to cart
        await page.click('#\\33 > .shelf-item__buy-btn');

        // get name of item in cart
        const productInCart = await page.textContent('#__next > div > div > div.float-cart.float-cart--open > div.float-cart__content > div.float-cart__shelf-container > div > div.shelf-item__details > p.title');

        // check if product in cart is same as one added
        expect(productInCart).toEqual(productToAdd);
    });

    test("Test #4", async ({page}) => {
        // visit the site
        await page.goto('https://bstackdemo.com/');

        // get name of product we want to add to cart\
        const productToAdd = await page.locator('#\\33  > p').textContent();

        // click on add to cart
        await page.click('#\\33 > .shelf-item__buy-btn');

        // get name of item in cart
        const productInCart = await page.textContent('#__next > div > div > div.float-cart.float-cart--open > div.float-cart__content > div.float-cart__shelf-container > div > div.shelf-item__details > p.title');

        // check if product in cart is same as one added
        expect(productInCart).toEqual(productToAdd);
    });
})

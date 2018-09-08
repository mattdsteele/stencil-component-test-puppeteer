import { newE2EPage, E2EPage } from "@stencil/core/testing";
import { MyComponent } from "./my-component";
import { E2EElement } from "@stencil/core/dist/testing/puppeteer/puppeteer-declarations";

describe("my-component", () => {
  it("should build", () => {
    expect(new MyComponent()).toBeTruthy();
  });

  describe("rendering", () => {
    let element: E2EElement;
    let page: E2EPage;
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(`
      <my-component></my-component>
      `);
      element = await page.find("my-component");
    });

    it("should work without parameters", () => {
      expect(element.innerHTML.trim()).toEqual("Hello, World! I'm");
    });

    it("should work with a first name", async () => {
      element.setProperty("first", "Peter");
      await page.waitForChanges();
      expect(element.innerHTML.trim()).toEqual("Hello, World! I'm Peter");
    });

    it("should work with a last name", async () => {
      element.setProperty("last", "Parker");
      await page.waitForChanges();
      expect(element.innerHTML.trim()).toEqual("Hello, World! I'm  Parker");
    });

    it("should work with both a first and a last name", async () => {
      element.setProperty("first", "Peter");
      element.setProperty("last", "Parker");
      await page.waitForChanges();
      expect(element.innerHTML.trim()).toEqual(
        "Hello, World! I'm Peter Parker"
      );
    });
  });
});

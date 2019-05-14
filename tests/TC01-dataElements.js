describe("Data is loaded", function(){
    it("should show a bunch of data", function(){
        browser.get("http://localhost:8080");
        var element = element.all(by.repeater("injured in injuredHospitalized"));
        expect(element.count()).toBeGreaterThan(0);
    });
    
    it("Should show the created item", function () {
		var filterInput = element(by.model('filter.event'));
		browser.wait(until.visibilityOf(filterInput), 5000, 'Input filter field took too long!').then(function () {
			filterInput.click().clear().sendKeys(itemName);
			expect(element.all(by.repeater("d in data")).count()).toBe(1);
		});
	});
});
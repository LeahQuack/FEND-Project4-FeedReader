/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    // Test suite - a test suite just contains
    // a related set of tests. This suite is all about the RSS
    // feeds definitions, the allFeeds variable in our application.
    describe('RSS Feeds', function() {
        // Tests to make sure that the
        // allFeeds variable has been defined and that it is not
         // empty.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // Test that loops through each feed
         // in the allFeeds object and ensures it has a URL defined
         // and that the URL is not empty.

         it('url defined', function(){
           for(let feed of allFeeds) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           }
         });


        // Test that loops through each feed
         // in the allFeeds object and ensures it has a name defined
         // and that the name is not empty.

         it('name defined', function() {
           for(let feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           }
         });
    });


    // New test suite named "The menu"
    describe('The menu', function() {

      //Test ensuring the menu element is
       // hidden by default
       it('is hidden', function() {
         const body = document.querySelector('body');
         expect (body.classList.contains('menu-hidden')).toBe(true);
       });

       // Test ensuring the menu changes
        // visibility when the menu icon is clicked.
        it('toggles on and off', function() {
          const body = document.querySelector('body');
          const menu = document.querySelector('.menu-icon-link');

          menu.click();
          expect(body.classList.contains('menu-hidden')).toBe(false);

          menu.click();
          expect(body.classList.contains('menu-hidden')).toBe(true);

        });
    });

    // New test suite named "Initial Entries"
    describe('Initial Entries', function() {

      //Test that ensures when the loadFeed
       //function is called and completes its work, there is at least
       // a single .entry element within the .feed container.
      beforeEach(function(done) {
        loadFeed(0, done);
      });

        it('are present', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    // New test suite of New Feed Selection
    describe("New Feed Selection", function() {

    // Test that ensures when a new feed is loaded by the loadFeed function
    // that the content actually changes.  loadFeed() is asynchronous.
      var oldFeed;
      beforeEach(function(done) {
        loadFeed(0, function() {
          oldFeed = document.querySelector(".feed").innerHTML;
          loadFeed(1, function() {
            done();
          });
        });
      });

      // Make sure the feed is changing
      it("changes its loaded content", function(done) {
        var newFeed = document.querySelector(".feed").innerHTML;
        expect(oldFeed).not.toBe(newFeed);
        done();
      });
    });

  }());

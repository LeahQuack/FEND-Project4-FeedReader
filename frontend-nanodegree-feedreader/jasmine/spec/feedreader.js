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
    /* First test suite
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('url defined', function(){
           for(let feed of allFeeds) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           }
         });


        /* Test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('name defined', function() {
           for(let feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           });
         });
    });


    /* New test suite */
    describe('The menu', function() {

      /* Test ensures the menu element is
       * hidden by default.
       */
       it('is hidden', function() {
         const body = document.querySelector('body');
         expect (body.classList.contains('menu-hidden')).toBe(true);
       });

       /* Test ensures the menu changes
        * visibility when the menu icon is clicked. This two expectations: does the menu display when
        * clicked and does it hide when clicked again?
        */
        it('toggles on and off', function() {
          const body = document.querySelector('body');
          const menu = document.querySelector('.menu-icon-link');

          menu.click();
          expect(body.classList.contains('menu-hidden')).toBe(false);
            
          menu.click();
          expect(body.classList.contains('menu-hidden')).toBe(true);
            
        });
    });

    /* New test suite */
    describe('Initial Entries', function() {

      /* Test ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       */
      beforeEach(function(done) {
        loadFeed(0, done);
      });

      it('completes work', function() {
        const feed = document.querySelector('.feed');
        expect(feed.children.length > 1).toBe(true);
      });
    });

    /* New test suite */
    describe('New Feed Selection', function() {
      /* Test ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       */
         let initialFeedHTML;
         let secondFeedHTML;
           
           beforeEach(function(done) {
               loadFeed(0, function() {
                   initialFeedHTML = $('.feed').children().text();
                   done();
               });
           });
       it('second feed', function(done) {
         loadFeed(1, function() {
             secondFeedHTML = $('.feed').children().text();
             expect(secondFeedHTML).not.toEqual(initialFeedHTML);
             done();
         });
       });
    });

}());

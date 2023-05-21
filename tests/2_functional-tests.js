const chai = require("chai");
const assert = chai.assert;

const server = require("../server");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);
  suite("Integration tests with chai-http", function () {
    // #1 checks if get('/hello') request will respond with res.status 200, and res.text "hello guest"
    test("Test GET /hello with no name", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/hello")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello Guest");
          done();
        });
    });
    // #2 checks if get('/hello?name=qurriah') request will respond with res.status 200, and res.text "qurriah"
    test("Test GET /hello with your name", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/hello?name=qurriah")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello qurriah");
          done();
        });
    });
    // #3 mimics post request to '/travellers' with body in send method
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .keepOpen()
        .put("/travellers")
        .send({
          surname: "Colombo",
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(res.body.name, "Cristoforo");
          assert.equal(res.body.surname, "Colombo");

          done();
        });
    });
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .keepOpen()
        .put("/travellers")
        .send({
          surname: "da Verrazzano",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(res.body.name, "Giovanni");
          assert.equal(res.body.surname, "da Verrazzano");
        });

      done();
    });
  });
});

/* let Browser = require("zombie");
Browser.site("https://mochachai-1rzs.onrender.com"); */

//# to test on localhost comment out browser.site() use Browser.localhost()
// Browser.localhost("mochachai-1rzs.onrender.com", process.env.PORT || 3000);

/* suite("Functional Tests with Zombie.js", function () {
  this.timeout(5000);
  const browser = new Browser();

  suiteSetup((done) => {
    // Remember, web interactions are asynchronous !!
    return browser.visit("/", done); // Browser asynchronous operations take a callback.
  });

  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('Submit the surname "Colombo" in the HTML form', function (done) {
      // fills input name=surname with Colombo
      browser.fill("surname", "Colombo").then(() => {
        // invokes submit event
        browser.pressButton("submit", () => {
          // checks response status is 200 ok
          browser.assert.success();
          // checks if span id=name is cristoforo
          browser.assert.text("span#name", "Cristoforo");
          // checks if span id=dates count is 1
          browser.assert.element("span#dates", 1);
          done();
        });
      });

      done();
    });
    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      // fill the form...
      // then submit it pressing 'submit' button.
      browser
        .fill("surname", "Vespucci")
        .then(() =>
          browser.pressButton("submit", () => {
            // pressButton is Async.  Waits for the ajax call to complete...
            // assert that status is OK 200
            // assert that the text inside the element 'span#name' is 'Amerigo'
            // assert that the text inside the element 'span#surname' is 'Vespucci'
            // assert that the element(s) 'span#dates' exist and their count is 1
            browser.assert.success();
            browser.assert.text("span#name", "Amerigo");
            browser.assert.text("span#surname", "Vespucci");
            browser.assert.element("span#dates", 1);
            done();
            setTimeout(() => process.exit(), 100);
          })
        )
        .catch((err) => console.log(`error = ${err.code}`));

      done();
    });
  });
}); */

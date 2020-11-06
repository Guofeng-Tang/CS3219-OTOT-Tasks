const chai = require('chai');
const chaiHttp = require('chai-http');
const {app} = require('../index');

// Configure chai
chai.use(chaiHttp);
chai.should();

const APIPath = "/api/users"

describe("Users", () => {

    describe("GET request", () => {

        it("should get all users record", (done) => {
            chai.request(app)
                .get(APIPath + '/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("status", "success");
                    res.body.should.have.property("message", "Users retrieved successfully");
                    done();
                });
        });

        it("should get a single user record", (done) => {
            const id = "5fa19e2b7ad27c70b3eef860";
            chai.request(app)
                .get(`${APIPath}/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("status", "success");
                    res.body.should.have.property("message", "User details retrieved");
                    done();
                });
        });

        it("should not get a single user record", (done) => {
            const id = "5";
            chai.request(app)
                .get(`${APIPath}/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("status", "error");
                    done();
                });
        });

    });

    describe("POST PUT & DELETE request", () => {

        let id = null

        describe("Create user record", () => {
            it("should add a user record", (done) => {
                chai.request(app)
                    .post(APIPath + '/')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send({email: 'testing@otot.com'})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property("status", "success");
                        res.body.should.have.property("message", "New user created!");
                        res.body.data.should.have.property("screenName", "a screen name");

                        // assign id, for update and delete later
                        id = res.body.data._id;

                        done();
                    });
            });
        });

        describe("Update and Delete user record created", () => {
            it("should update a user record", (done) => {
                chai.request(app)
                    .put(`${APIPath}/${id}`)
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send({screenName: 'new name'})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property("status", "success");
                        res.body.should.have.property("message", "User details updated");
                        res.body.data.should.have.property("screenName", "new name");
                        done();
                    });
            });

            it("should not update a user record", (done) => {
                chai.request(app)
                    .put(`${APIPath}/invalid_id`)
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send({screenName: 'new name'})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property("status", "error");
                        done();
                    });
            });

            it("should delete a user record", (done) => {
                chai.request(app)
                    .delete(`${APIPath}/${id}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property("status", "success");
                        res.body.should.have.property("message", "User deleted");
                        done();
                    });
            });
        });
    });
});

/**
 * @jest-environment node
 */

const fs = require("fs");
const os = require("os");
const path = require("path");

const tmpFile = path.join(os.tmpdir(), `card-ui-comments-${Date.now()}.json`);
fs.writeFileSync(tmpFile, JSON.stringify([{ id: 1, img: "img/img1.jpg" }]));
process.env.COMMENTS_FILE = tmpFile;

const request = require("supertest");
const app = require("../../../server");

afterAll(() => {
  try {
    fs.unlinkSync(tmpFile);
  } catch (e) {
    // ignore cleanup errors
  }
});

describe("GET /api/comments", () => {
  test("returns the stored comments", async () => {
    const res = await request(app).get("/api/comments");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });
});

describe("POST /api/comments", () => {
  test("rejects a request without author", async () => {
    const res = await request(app).post("/api/comments").send({ text: "hello" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test("rejects a request without text", async () => {
    const res = await request(app).post("/api/comments").send({ author: "tester" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test("rejects non-string fields", async () => {
    const res = await request(app).post("/api/comments").send({ author: 42, text: {} });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test("rejects over-long fields", async () => {
    const res = await request(app)
      .post("/api/comments")
      .send({ author: "a".repeat(101), text: "hello" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test("appends a valid comment", async () => {
    const res = await request(app).post("/api/comments").send({ author: "tester", text: "hello" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[1]).toMatchObject({ author: "tester", text: "hello" });
  });
});
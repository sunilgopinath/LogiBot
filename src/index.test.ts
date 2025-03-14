import request from 'supertest';
import app from './index'; // Import the real app

describe('POST /api/query', () => {
  it('returns shipment details for a valid ID', async () => {
    const response = await request(app)
      .post('/api/query')
      .send({ query: "Where is shipment #123?" })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({
      response: {
        type: "shipment",
        data: {
          id: "123",
          status: "In Transit",
          location: "Chicago",
          eta: "March 16, 2025"
        }
      }
    });
  });

  it('returns error for an invalid shipment ID', async () => {
    const response = await request(app)
      .post('/api/query')
      .send({ query: "Where is shipment #999?" })
      .expect(200);

    expect(response.body).toEqual({
      response: {
        type: "error",
        message: "Shipment #999 not found"
      }
    });
  });

  it('returns text response for non-shipment query', async () => {
    const response = await request(app)
      .post('/api/query')
      .send({ query: "Hello" })
      .expect(200);

    expect(response.body).toEqual({
      response: {
        type: "text",
        message: "You asked: Hello"
      }
    });
  });
});
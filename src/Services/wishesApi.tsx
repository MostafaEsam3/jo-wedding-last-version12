const API_URL =
  'https://mostafa-wedding-backend.vercel.app/api';

export async function createWish(data) {
  const response = await fetch(`${API_URL}/wishes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to send wish');
  }

  return result;
}

export async function getWishes(page = 1, limit = 5) {
  const response = await fetch(
    `${API_URL}/wishes?page=${page}&limit=${limit}`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to load wishes');
  }

  return result;
}
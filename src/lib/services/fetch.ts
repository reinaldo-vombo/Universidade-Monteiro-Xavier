const API = process.env.GATSBY_APP_API_BASE_URL;

export async function fetchJSON(path: string) {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`Fetch failed: ${path}`);
  const resut = await res.json();

  return resut.data;
}

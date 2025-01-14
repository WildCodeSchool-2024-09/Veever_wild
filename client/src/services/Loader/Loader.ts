export async function fetchCatalogData() {
  try {
    const [restaurants, hostels, activities] = await Promise.all([
      fetch("/api/restaurants").then((res) => res.json()),
      fetch("/api/hostels").then((res) => res.json()),
      fetch("/api/activities").then((res) => res.json()),
    ]);

    return [...restaurants, ...hostels, ...activities];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

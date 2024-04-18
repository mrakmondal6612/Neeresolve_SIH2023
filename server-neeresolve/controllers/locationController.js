export const getLocationFromLatLong = async (lat, long) => {
  const apiKey = "AIzaSyBHwXv0GUIaw8A8go606CIqZ2qSF3WxU0g";
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${apiKey}`;

  try {
    const fetchResponse = await fetch(apiUrl);

    if (!fetchResponse.ok) {
      throw new Error(
        `Error retrieving location. Status: ${fetchResponse.status}`
      );
    }

    const data = await fetchResponse.json();
    const location = data.results[1]?.formatted_address;

    return location;
  } catch (error) {
    throw error;
  }
};

export const handleLocationRequest = async (req, res, next) => {
  const { lat, long } = req.body;

  try {
    const location = await getLocationFromLatLong(lat, long, apiKey);
    res.status(200).json({ location });
  } catch (error) {
    next(error);
  }
};

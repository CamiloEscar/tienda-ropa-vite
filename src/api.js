import axios from 'axios';

const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRZjGFNwqq6bIV4aFDei7NSctgYKA-SIzbJmcfArtrB-cg2zgbQs4G1aX7mrs1llSWebCloMe_-v87S/pub?output=tsv';

export const getProducts = async () => {
  try {
    const response = await axios.get(GOOGLE_SHEET_URL);
    const rows = response.data.split('\n').slice(1);
    return rows.map(row => {
      const [id, name, description, price, category, imageUrl, stock, size, color, marca, featured, promo] = row.split('\t');
      return {
        id: String(id),
        name,
        description,
        price: parseFloat(price),
        category,
        imageUrl,
        stock: parseInt(stock, 10),
        size: size.split(','),
        color: color.split(','),
        marca,
        featured: featured === 'Sí',
        promo,
      };
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${GOOGLE_SHEET_URL}&gid=882526814`);
    const rows = response.data.split('\n').slice(1);
    return rows.map(row => {
      const [id, name, description, imageUrl] = row.split('\t');
      return { id, name, description, imageUrl };
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getOffers = async () => {
  try {
    const response = await axios.get(`${GOOGLE_SHEET_URL}&gid=1892626888`);
    const rows = response.data.split('\n').slice(1);
    return rows.map(row => {
      const [id, titulo, descripcion, imageUrl] = row.split('\t');
      return {
        id,
        title: titulo,
        description: descripcion,
        image: imageUrl
      };
    });
  } catch (error) {
    console.error('Error fetching offers:', error);
    throw error;
  }
};
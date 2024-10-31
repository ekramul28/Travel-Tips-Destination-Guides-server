import { MeiliSearch } from 'meilisearch';
import { Document, Types } from 'mongoose';

import config from '../config';
import { TPost } from '../modules/postCreating/postCreating.interface';
export const noImage =
  'https://t3.ftcdn.net/jpg/05/79/68/24/360_F_579682479_j4jRfx0nl3C8vMrTYVapFnGP8EgNHgfk.jpg';

const meiliClient = new MeiliSearch({
  host: config.meilisearch_host as string,
  apiKey: config.meilisearch_master_key,
});

export async function addDocumentToIndex(
  result: Document<unknown, object, TPost> & TPost & { _id: Types.ObjectId },
  indexKey: string,
) {
  const index = meiliClient.index(indexKey);

  const { _id, title, description, images } = result;
  const firstImage = images?.[0] || noImage;

  const document = {
    id: _id.toString(), // Ensure the ID is a string
    title,
    description,
    thumbnail: firstImage,
  };

  try {
    await index.addDocuments([document]);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error adding document to MeiliSearch:', error);
  }
}

export const deleteDocumentFromIndex = async (indexKey: string, id: string) => {
  const index = meiliClient.index(indexKey);

  try {
    await index.deleteDocument(id);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error deleting resource from MeiliSearch:', error);
  }
};

export default meiliClient;

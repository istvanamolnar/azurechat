import { CosmosClient } from "@azure/cosmos";

export const CosmosInstance = () => {
  const endpoint = process.env.AZURE_COSMOSDB_URI;
  const key = process.env.AZURE_COSMOSDB_KEY;

  if (!endpoint || !key) {
    throw new Error(
      "Azure Cosmos DB is not configured. Please configure it in the .env file."
    );
  }

  return new CosmosClient({ endpoint, key });
};

export const ChatHistoryContainer = () => {
  const containerName = process.env.AZURE_COSMOSDB_CHATHISTORY_CONTAINER_NAME || 'chatHistory';
  const container = getContainer(containerName);
  return container;
};

export const DocumentsContainer = () => {
  const containerName = process.env.AZURE_COSMOSDB_DOCUMENTS_CONTAINER_NAME || 'documents';
  const container = getContainer(containerName);
  return container;
};

export const ExtensionsContainer = () => {
  const containerName = process.env.AZURE_COSMOSDB_EXTENSIONS_CONTAINER_NAME || 'extensions';
  const container = getContainer(containerName);
  return container;
};

export const PersonasContainer = () => {
  const containerName = process.env.AZURE_COSMOSDB_PERSONAS_CONTAINER_NAME || 'personas';
  const container = getContainer(containerName);
  return container;
};

export const PromptsContainer = () => {
  const containerName = process.env.AZURE_COSMOSDB_PROMPTS_CONTAINER_NAME || 'prompts';
  const container = getContainer(containerName);
  return container;
};

const getContainer = (containerName: string) => {
  const DB_NAME = process.env.AZURE_COSMOSDB_DB_NAME || "chat";
  const client = CosmosInstance();
  const database = client.database(DB_NAME);
  const container = database.container(containerName);
  return container;
}
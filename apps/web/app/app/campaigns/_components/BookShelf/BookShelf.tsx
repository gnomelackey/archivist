"use client";

import { GET_CAMPAIGNS_QUERY, type Campaign } from "@repo/clients";
import { useQuery } from "@apollo/client";
import { Book } from "./Book/Book";
import styles from "./BookShelf.module.css";

export const BookShelf = () => {
  const { data, loading, error } = useQuery(GET_CAMPAIGNS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching campaigns</p>;

  const campaigns = data?.campaigns || [];

  if (campaigns.length === 0) {
    return <p>No campaigns found. Create a new one!</p>;
  }

  const booksPerShelf = 7;
  const shelves = [];

  for (let i = 0; i < campaigns.length; i += booksPerShelf) {
    shelves.push(campaigns.slice(i, i + booksPerShelf));
  }

  return (
    <div className={styles.bookcase}>
      {shelves.map((shelfBooks, shelfIndex) => (
        <div key={shelfIndex} className={styles.shelf}>
          <div className={styles.books}>
            {shelfBooks.map((campaign: Campaign) => (
              <Book
                key={campaign.id}
                id={campaign.id}
                title={campaign.name}
                subtitle={campaign.description}
                width={100}
                height={300}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

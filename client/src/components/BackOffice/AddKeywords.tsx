import { useState } from "react";

export default function AddKeywords() {
  const [dataKeywords, setDataKeywords] = useState({
    name: "",
    link: "",
  });

  const handleSubmit = () => {
    fetch("http://localhost:3310/api/keywords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataKeywords),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur lors de l'envoi: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataKeywords((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <form action="submit" method="post">
        <label htmlFor="keyword">
          Ajoutez un mot-clé
          <input type="text" name="name" id="keyword" onChange={onChange} />
        </label>
        <label htmlFor="url">
          Ajoutez l'URL d'une image
          <input type="text" name="link" id="url" onChange={onChange} />
        </label>
        <button onClick={handleSubmit} type="button">
          Envoyer
        </button>
      </form>
    </>
  );
}

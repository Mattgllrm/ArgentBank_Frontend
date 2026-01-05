import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserName } from "../redux/userSlice";

export default function User() {
  const { profile, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(profile?.userName || "");

  if (!profile) return <p>Veuillez vous connecter</p>;

  const accounts = profile.accounts || [
    {
      title: "Argent Bank Checking",
      number: "x8349",
      balance: "$2,082.79",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Savings",
      number: "x6712",
      balance: "$10,928.42",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Credit Card",
      number: "x8349",
      balance: "$184.30",
      description: "Current Balance",
    },
  ];

  const handleSave = async () => {
    if (!userName) return; // éviter username vide

    try {
      const resultAction = await dispatch(updateUserName({ token, userName }));
      if (updateUserName.fulfilled.match(resultAction)) {
        setIsEditing(false); // fermer le mode édition
      } else {
        console.error("Erreur lors de la mise à jour du username");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="main bg-dark">
      <div className="header">

        {/*  MODE AFFICHAGE */}
        {!isEditing && (
          <>
            <h1>
              Welcome back
              <br />
              {profile.firstName} {profile.lastName}!
            </h1>
            <button
              className="edit-button"
              onClick={() => setIsEditing(true)}
            >
              Edit Name
            </button>
          </>
        )}

        {/*MODE EDITION   */}
        {isEditing && (
          <form className="edit-name-form" onSubmit={(e) => e.preventDefault()}>
            <div className="input-wrapper">
              <label>Username</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="input-wrapper">
              <label>First Name</label>
              <input type="text" value={profile.firstName} disabled />
            </div>

            <div className="input-wrapper">
              <label>Last Name</label>
              <input type="text" value={profile.lastName} disabled />
            </div>

            <div className="edit-buttons">
              <button
                type="button"
                className="save-button"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  setIsEditing(false);
                  setUserName(profile.userName);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>

      {accounts.map((account, index) => (
        <section className="account" key={index}>
          <div className="account-content-wrapper">
            <h3 className="account-title">
              {account.title} ({account.number})
            </h3>
            <p className="account-amount">{account.balance}</p>
            <p className="account-amount-description">{account.description}</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">
              View transactions
            </button>
          </div>
        </section>
      ))}
    </main>
  );
}

import React from "react";
import { useSelector } from "react-redux";

export default function User() {
  const { profile } = useSelector((state) => state.user);

  if (!profile) return <p>Veuillez vous connecter</p>; // si profil pas chargé

  
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

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {profile.firstName} {profile.lastName}!
        </h1>
        <button className="edit-button">Edit Name</button>
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
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      ))}
    </main>
  );
}

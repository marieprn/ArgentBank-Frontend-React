import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserName } from "../features/auth/authSlice";

export default function User() {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("");

  const openEdit = () => {
    setUserName(user?.userName || "");
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(updateUserName(userName));
    if (updateUserName.fulfilled.match(res)) {
      setIsEditing(false);
    }
  };

  return (
    <div className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {user ? `${user.firstName} ${user.lastName} (${user.userName})!` : "User!"}
        </h1>

        {!isEditing ? (
          <button className="edit-button" type="button" onClick={openEdit}>
            Edit Name
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="edit-name-form">
            <div className="input-wrapper">
              <label htmlFor="userName">User name</label>
              <input
                id="userName"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            {error ? <p className="error-text">{error}</p> : null}

            <div className="edit-name-actions">
              <button className="edit-button" type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </button>

              <button
                className="edit-button"
                type="button"
                onClick={cancelEdit}
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button" type="button">
            View transactions
          </button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button" type="button">
            View transactions
          </button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button" type="button">
            View transactions
          </button>
        </div>
      </section>
    </div>
  );
}
import { SettingsState, CategoryItem, NoteItem, SyncStatePayload } from "types";
import { auth, db } from "../firebase/firebase";

export const saveSettings = (settings: SettingsState) => {
  return localStorage.setItem("settings", JSON.stringify(settings));
};

export const requestSettings = () => {
  return localStorage.getItem("settings");
};

export const requestNotes = () => {
  // const localVersion = localStorage.getItem("meta");
  // console.log("request notes");
  // if (auth.currentUser && auth.currentUser.uid) {
  //   db.collection("userNotes")
  //     .doc(auth.currentUser.uid)
  //     .get()
  //     .then(doc => {
  //       if (doc.exists) {
  //         console.log(doc.data());
  //       }
  //     })
  //     .catch(err => console.log(err));
  // }

  const notes = localStorage.getItem("notes");
  if (notes) {
    return JSON.parse(notes) as NoteItem[];
  }
};

export const requestCategories = () => {
  const categories = localStorage.getItem("categories");
  if (categories) {
    return JSON.parse(categories) as CategoryItem[];
  }
};

export const saveState = async ({
  categories,
  notes,
  meta
}: SyncStatePayload) => {
  localStorage.setItem("categories", JSON.stringify(categories));
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("meta", JSON.stringify(meta));
};

//AUTH

export const signUpUser = (email: any, password: any) => {
  auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
    console.log(error);
  });
};
export const signInUser = (email: any, password: any) => {
  auth.signInWithEmailAndPassword(email, password).catch(function(error) {
    console.log(error);
  });
};

export const signOutUser = () => {
  auth
    .signOut()
    .then(function() {
      // Sign-out successful.
    })
    .catch(function(error) {
      console.log(error);
    });
};

//DATA
export const saveNotesToFirestore = (
  notes: any,
  categories: any,
  meta: any
) => {
  if (auth.currentUser && auth.currentUser.uid) {
    const user = auth.currentUser.uid;
    const ref = db.collection("userNotes").doc(user);

    ref
      .set({ notes, categories, meta })
      .then(() => {
        console.log("written!");
      })
      .catch(err => console.log(err));
  }
};

export const loadNotesFromFirestore = () => {
  if (auth.currentUser && auth.currentUser.uid) {
    const user = auth.currentUser.uid;
    const ref = db.collection("userNotes").doc(user);

    ref
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          return doc.data();
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
        return false;
      });
  }
};

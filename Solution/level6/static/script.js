document.addEventListener("DOMContentLoaded", async () => {
  // Load notes from the server
  try {
    const response = await fetch("/get_notes");
    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }
    const notes = await response.json();

    document.querySelectorAll(".day").forEach((day) => {
      const dayTitle = day.querySelector(".daytitle").textContent;
      const notesField = day.querySelector(".notes");

      if (notes[dayTitle]) {
        notesField.value = notes[dayTitle];
      }
    });
    console.log("Notes loaded successfully.");
  } catch (error) {
    console.error("Error loading notes:", error);
  }

  // Add event listener to the Save Notes button
  const saveNotesButton = document.querySelector("#save-notes-btn");

  saveNotesButton.addEventListener("click", async () => {
    const notesData = {};
    document.querySelectorAll(".day").forEach((day) => {
      const dayTitle = day.querySelector(".daytitle").textContent;
      const notesField = day.querySelector(".notes");

      notesData[dayTitle] = notesField.value;
    });

    try {
      const response = await fetch("/save_notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notesData),
      });

      if (!response.ok) {
        throw new Error("Failed to save notes");
      }

      alert("All notes have been saved!");
    } catch (error) {
      console.error("Error saving notes:", error);
      alert("Failed to save notes!");
    }
  });
});

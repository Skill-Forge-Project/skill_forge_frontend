const QUESTS_API = import.meta.env.VITE_QUESTS_SERVICE_URL;

// Get all quests from the Quests Service
export const getAllQuests = async (accessToken, checkValidToken) => {
  const res = await fetch(`${QUESTS_API}/quests`, {
    method: "GET",
    credentials: "include", // Ensure cookies are sent for session management
  });

  //const isTokenValid = await checkValidToken(res.status);

  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch quests");
  }
};

// Get all quests by language from the Quests Service
export const getQuestsByLanguage = async (language, accessToken, checkValidToken) => {
  const res = await fetch(`${QUESTS_API}/quests/${language}`, {
    method: "GET",
    credentials: "include" // Ensure cookies are sent for session management
   });

  // const isTokenValid = await checkValidToken(res.status); 

  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error(data.message || "Failed to fetch quests by language");
  }
};

// Get a single quest by ID from the Quests Service
export const getQuestById = async (questId, accessToken, checkValidToken) => {
  const res = await fetch(`${QUESTS_API}/quest/${questId}`, {
    method: "GET",
    credentials: "include", // Ensure cookies are sent for session management
  });

  // const isTokenValid = await checkValidToken(res.status);

  // if (isTokenValid && res.ok) {
  //   const data = await res.json();
  //   return data;
  // } else {
  //   throw new Error(data.message || "Failed to fetch quest");
  // }
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch quest");
  }
};


// Get a single quest by ID from the Quests Service for Edit Quest Page in Admin Dashboard
export const editQuestById = async (questId, accessToken, checkValidToken) => {
  const res = await fetch(`${QUESTS_API}/edit_quest/${questId}`, {
    method: "GET",
    credentials: "include", // Ensure cookies are sent for session management
  });

  //const isTokenValid = await checkValidToken(res.status);

  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch quest for editing");
  }
};

// Get all solutions for a user
export const getSolvedQuestsByUserId = async (userId, accessToken) => {
  const res = await fetch(`${QUESTS_API}/solutions/${userId}`, {
    method: "GET",
    credentials: "include", // Ensure cookies are sent for session management
  });

  //const isTokenValid = await checkValidToken(res.status);

  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch solved quests");
  }
};

// Get all correct solutions for a user
export const getCorrectSolutionsByUserId = async (userId, accessToken, checkValidToken) => {
  const res = await fetch(`${QUESTS_API}/correct_solutions/${userId}`, {
    method: "GET",
    credentials: "include", // Ensure cookies are sent for session management
  });

  // const isTokenValid = await checkValidToken(res.status);

  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error(data.message || "Failed to fetch correct solutions");
  }
};
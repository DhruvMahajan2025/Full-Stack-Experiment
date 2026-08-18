import {
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";

import "./App.css";

const initialPosts = [
  {
    id: 1,
    title: "Instagram Campaign",
    platform: "Instagram",
    date: "2026-08-18",
    time: "10:00",
    status: "Scheduled",
  },
  {
    id: 2,
    title: "LinkedIn Announcement",
    platform: "LinkedIn",
    date: "2026-08-19",
    time: "12:00",
    status: "Scheduled",
  },
  {
    id: 3,
    title: "Facebook Product Post",
    platform: "Facebook",
    date: "2026-08-20",
    time: "15:00",
    status: "Scheduled",
  },
];


/* =========================================
   DATE HELPERS
========================================= */

const pad = (number) =>
  String(number).padStart(2, "0");


const formatDate = (date) => {
  return `${date.getFullYear()}-${pad(
    date.getMonth() + 1
  )}-${pad(date.getDate())}`;
};


const parseDate = (dateString) => {
  const [year, month, day] =
    dateString.split("-").map(Number);

  return new Date(year, month - 1, day);
};


const addDays = (date, amount) => {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
};


const addMonths = (date, amount) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + amount);
  return result;
};


const startOfWeek = (date) => {
  const result = new Date(date);
  const day = result.getDay();

  result.setDate(
    result.getDate() - day
  );

  return result;
};


const getMonthDays = (date) => {
  const firstDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  );

  const firstSunday = startOfWeek(firstDay);

  return Array.from(
    { length: 42 },
    (_, index) =>
      addDays(firstSunday, index)
  );
};


const monthName = (date) => {
  return date.toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    }
  );
};


const shortDate = (date) => {
  return date.toLocaleDateString(
    "en-US",
    {
      weekday: "short",
      month: "short",
      day: "numeric",
    }
  );
};


/* =========================================
   STATISTICS
========================================= */

const Statistics = memo(
  function Statistics({ posts }) {

    const instagram = posts.filter(
      (post) =>
        post.platform === "Instagram"
    ).length;

    const facebook = posts.filter(
      (post) =>
        post.platform === "Facebook"
    ).length;

    const linkedin = posts.filter(
      (post) =>
        post.platform === "LinkedIn"
    ).length;

    return (
      <div className="statistics">

        <div className="stat-card">
          <span>Total Posts</span>
          <strong>{posts.length}</strong>
        </div>

        <div className="stat-card">
          <span>Instagram</span>
          <strong>{instagram}</strong>
        </div>

        <div className="stat-card">
          <span>Facebook</span>
          <strong>{facebook}</strong>
        </div>

        <div className="stat-card">
          <span>LinkedIn</span>
          <strong>{linkedin}</strong>
        </div>

      </div>
    );
  }
);


/* =========================================
   POST CARD
========================================= */

const PostCard = memo(
  function PostCard({
    post,
    onSelect,
    onDragStart,
  }) {

    return (
      <div
        className={`post-card ${post.platform.toLowerCase()}`}
        draggable
        onDragStart={(event) =>
          onDragStart(
            event,
            post.id
          )
        }
        onClick={() =>
          onSelect(post)
        }
      >

        <div className="post-platform">

          <span className="platform-dot" />

          {post.platform}

        </div>

        <strong>
          {post.title}
        </strong>

        <span className="post-time">
          {post.time}
        </span>

      </div>
    );
  }
);


/* =========================================
   APP
========================================= */

function App() {

  const [posts, setPosts] =
    useState(initialPosts);

  const [currentDate, setCurrentDate] =
    useState(
      new Date(2026, 7, 18)
    );

  const [view, setView] =
    useState("month");

  const [activePage, setActivePage] =
    useState("Calendar");

  const [selectedPost, setSelectedPost] =
    useState(null);

  const [draggedPostId, setDraggedPostId] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [editingPost, setEditingPost] =
    useState(null);

  const [form, setForm] = useState({
    title: "",
    platform: "Instagram",
    date: "2026-08-18",
    time: "10:00",
  });


  /* =======================================
     MEMOIZATION
  ======================================= */

  const scheduledPosts = useMemo(() => {
    return posts.filter(
      (post) =>
        post.status === "Scheduled"
    );
  }, [posts]);


  const publishedPosts = useMemo(() => {
    return posts.filter(
      (post) =>
        post.status === "Published"
    );
  }, [posts]);


  const displayedPosts = useMemo(() => {

    if (activePage === "Scheduled") {
      return scheduledPosts;
    }

    if (activePage === "Published") {
      return publishedPosts;
    }

    return posts;

  }, [
    activePage,
    posts,
    scheduledPosts,
    publishedPosts,
  ]);


  const monthDays = useMemo(() => {
    return getMonthDays(currentDate);
  }, [currentDate]);


  const weekDays = useMemo(() => {

    const firstDay =
      startOfWeek(currentDate);

    return Array.from(
      { length: 7 },
      (_, index) =>
        addDays(firstDay, index)
    );

  }, [currentDate]);


  /* =======================================
     NAVIGATION
  ======================================= */

  const goPrevious = useCallback(() => {

    if (view === "month") {
      setCurrentDate(
        addMonths(currentDate, -1)
      );
    } else {
      setCurrentDate(
        addDays(currentDate, -7)
      );
    }

  }, [currentDate, view]);


  const goNext = useCallback(() => {

    if (view === "month") {
      setCurrentDate(
        addMonths(currentDate, 1)
      );
    } else {
      setCurrentDate(
        addDays(currentDate, 7)
      );
    }

  }, [currentDate, view]);


  const goToday = useCallback(() => {

    setCurrentDate(
      new Date(2026, 7, 18)
    );

  }, []);


  /* =======================================
     DRAG AND DROP
  ======================================= */

  const handleDragStart = useCallback(
    (event, postId) => {

      setDraggedPostId(postId);

      event.dataTransfer.effectAllowed =
        "move";

      event.dataTransfer.setData(
        "text/plain",
        String(postId)
      );

    },
    []
  );


  const handleDragOver = useCallback(
    (event) => {

      event.preventDefault();

      event.dataTransfer.dropEffect =
        "move";

    },
    []
  );


  const handleDrop = useCallback(
    (event, newDate) => {

      event.preventDefault();

      const postId = Number(
        event.dataTransfer.getData(
          "text/plain"
        )
      );

      if (!postId) {
        return;
      }

      setPosts((currentPosts) =>
        currentPosts.map((post) => {

          if (post.id === postId) {

            return {
              ...post,
              date: newDate,
            };

          }

          return post;

        })
      );

      setDraggedPostId(null);

    },
    []
  );


  /* =======================================
     POST SELECTION
  ======================================= */

  const handleSelectPost = useCallback(
    (post) => {

      setSelectedPost(post);

    },
    []
  );


  /* =======================================
     CREATE / EDIT
  ======================================= */

  const openCreateModal = useCallback(
    () => {

      setEditingPost(null);

      setForm({
        title: "",
        platform: "Instagram",
        date: formatDate(
          currentDate
        ),
        time: "10:00",
      });

      setShowModal(true);

    },
    [currentDate]
  );


  const openEditModal = useCallback(
    (post) => {

      setEditingPost(post);

      setForm({
        title: post.title,
        platform: post.platform,
        date: post.date,
        time: post.time,
      });

      setShowModal(true);

    },
    []
  );


  const handleFormChange = useCallback(
    (event) => {

      const {
        name,
        value,
      } = event.target;

      setForm((current) => ({
        ...current,
        [name]: value,
      }));

    },
    []
  );


  const savePost = useCallback(
    (event) => {

      event.preventDefault();

      if (!form.title.trim()) {
        return;
      }


      if (editingPost) {

        setPosts((currentPosts) =>
          currentPosts.map((post) => {

            if (
              post.id ===
              editingPost.id
            ) {

              return {
                ...post,
                title: form.title,
                platform:
                  form.platform,
                date: form.date,
                time: form.time,
              };

            }

            return post;

          })
        );

      } else {

        const newPost = {
          id: Date.now(),
          title: form.title,
          platform: form.platform,
          date: form.date,
          time: form.time,
          status: "Scheduled",
        };

        setPosts((currentPosts) => [
          ...currentPosts,
          newPost,
        ]);

      }

      setShowModal(false);

      setEditingPost(null);

    },
    [editingPost, form]
  );


  /* =======================================
     DELETE
  ======================================= */

  const deletePost = useCallback(() => {

    if (!selectedPost) {
      return;
    }

    setPosts((currentPosts) =>
      currentPosts.filter(
        (post) =>
          post.id !==
          selectedPost.id
      )
    );

    setSelectedPost(null);

  }, [selectedPost]);


  /* =======================================
     POSTS FOR DATE
  ======================================= */

  const getPostsForDate =
    useCallback(
      (date) => {

        return displayedPosts.filter(
          (post) =>
            post.date ===
            formatDate(date)
        );

      },
      [displayedPosts]
    );


  /* =======================================
     PAGE TITLE
  ======================================= */

  const pageTitle = useMemo(() => {

    if (activePage === "Scheduled") {
      return "Scheduled Posts";
    }

    if (activePage === "Published") {
      return "Published Posts";
    }

    return monthName(currentDate);

  }, [
    activePage,
    currentDate,
  ]);


  /* =======================================
     RENDER
  ======================================= */

  return (
    <div className="app">


      {/* =================================
          SIDEBAR
      ================================= */}

      <aside className="sidebar">

        <div className="brand">

          <div className="brand-icon">
            P
          </div>

          <div>
            <h1>PostFlow</h1>

            <span>
              Social Scheduler
            </span>
          </div>

        </div>


        <nav>

          <button
            className={`nav-item ${
              activePage === "Calendar"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage(
                "Calendar"
              )
            }
          >
            <span>▦</span>
            Calendar
          </button>


          <button
            className={`nav-item ${
              activePage ===
              "Scheduled"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage(
                "Scheduled"
              )
            }
          >
            <span>◷</span>
            Scheduled
          </button>


          <button
            className={`nav-item ${
              activePage ===
              "Published"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage(
                "Published"
              )
            }
          >
            <span>✓</span>
            Published
          </button>

        </nav>


        <div className="sidebar-bottom">

          <div className="sidebar-stat">

            <span>
              Scheduled posts
            </span>

            <strong>
              {scheduledPosts.length}
            </strong>

          </div>


          <button
            className="create-button"
            onClick={
              openCreateModal
            }
          >
            + Create Post
          </button>

        </div>

      </aside>


      {/* =================================
          MAIN
      ================================= */}

      <main className="content">


        {/* TOP BAR */}

        <header className="topbar">

          <div>

            <p className="eyebrow">
              CONTENT PLANNER
            </p>

            <h2>
              {pageTitle}
            </h2>

          </div>


          <div className="top-actions">

            <button
              className="today-button"
              onClick={goToday}
            >
              Today
            </button>

            <button
              className="primary-button"
              onClick={
                openCreateModal
              }
            >
              + New Post
            </button>

          </div>

        </header>


        {/* =================================
            CALENDAR CONTROLS
        ================================= */}

        {activePage === "Calendar" && (

          <>

            <div className="calendar-toolbar">

              <div>

                <button
                  className="arrow-button"
                  onClick={
                    goPrevious
                  }
                >
                  ←
                </button>

                <button
                  className="arrow-button"
                  onClick={
                    goNext
                  }
                >
                  →
                </button>

              </div>


              <div className="view-switcher">

                <button
                  className={
                    view === "week"
                      ? "selected"
                      : ""
                  }
                  onClick={() =>
                    setView("week")
                  }
                >
                  Week
                </button>

                <button
                  className={
                    view === "month"
                      ? "selected"
                      : ""
                  }
                  onClick={() =>
                    setView("month")
                  }
                >
                  Month
                </button>

              </div>

            </div>


            {/* =================================
                MONTH VIEW
            ================================= */}

            {view === "month" && (

              <section className="calendar">

                <div className="month-head">

                  {[
                    "SUN",
                    "MON",
                    "TUE",
                    "WED",
                    "THU",
                    "FRI",
                    "SAT",
                  ].map((day) => (

                    <div key={day}>
                      {day}
                    </div>

                  ))}

                </div>


                <div className="month-grid">

                  {monthDays.map(
                    (date) => {

                      const dateString =
                        formatDate(
                          date
                        );

                      const dayPosts =
                        getPostsForDate(
                          date
                        );

                      const isCurrentMonth =
                        date.getMonth() ===
                        currentDate.getMonth();

                      const isToday =
                        dateString ===
                        "2026-08-18";


                      return (

                        <div
                          className={`month-cell ${
                            !isCurrentMonth
                              ? "other-month"
                              : ""
                          } ${
                            draggedPostId
                              ? "drop-zone"
                              : ""
                          }`}
                          key={dateString}
                          onDragOver={
                            handleDragOver
                          }
                          onDrop={(event) =>
                            handleDrop(
                              event,
                              dateString
                            )
                          }
                        >

                          <div className="date-number">

                            <span
                              className={
                                isToday
                                  ? "today-circle"
                                  : ""
                              }
                            >
                              {date.getDate()}
                            </span>

                          </div>


                          {dayPosts.map(
                            (post) => (

                              <PostCard
                                key={
                                  post.id
                                }
                                post={post}
                                onSelect={
                                  handleSelectPost
                                }
                                onDragStart={
                                  handleDragStart
                                }
                              />

                            )
                          )}

                        </div>

                      );

                    }
                  )}

                </div>

              </section>

            )}


            {/* =================================
                WEEK VIEW
            ================================= */}

            {view === "week" && (

              <section className="calendar">

                <div className="week-head">

                  {weekDays.map(
                    (date) => (

                      <div
                        key={
                          formatDate(
                            date
                          )
                        }
                      >

                        <span>
                          {date.toLocaleDateString(
                            "en-US",
                            {
                              weekday:
                                "short",
                            }
                          ).toUpperCase()}
                        </span>

                        <strong>
                          {date.getDate()}
                        </strong>

                      </div>

                    )
                  )}

                </div>


                <div className="week-grid">

                  {weekDays.map(
                    (date) => {

                      const dateString =
                        formatDate(
                          date
                        );

                      const dayPosts =
                        getPostsForDate(
                          date
                        );


                      return (

                        <div
                          className={`week-cell ${
                            draggedPostId
                              ? "drop-zone"
                              : ""
                          }`}
                          key={dateString}
                          onDragOver={
                            handleDragOver
                          }
                          onDrop={(event) =>
                            handleDrop(
                              event,
                              dateString
                            )
                          }
                        >

                          {dayPosts.map(
                            (post) => (

                              <PostCard
                                key={
                                  post.id
                                }
                                post={post}
                                onSelect={
                                  handleSelectPost
                                }
                                onDragStart={
                                  handleDragStart
                                }
                              />

                            )
                          )}

                          {dayPosts.length ===
                            0 && (

                            <span className="drop-text">
                              Drop post here
                            </span>

                          )}

                        </div>

                      );

                    }
                  )}

                </div>

              </section>

            )}

          </>

        )}


        {/* =================================
            SCHEDULED / PUBLISHED
        ================================= */}

        {activePage !== "Calendar" && (

          <section className="post-list">

            {displayedPosts.length === 0 ? (

              <div className="empty-state">

                <div>
                  ✓
                </div>

                <h3>
                  No {activePage.toLowerCase()} posts
                </h3>

                <p>
                  There are currently no
                  posts in this section.
                </p>

              </div>

            ) : (

              displayedPosts.map(
                (post) => (

                  <div
                    className="list-post"
                    key={post.id}
                    onClick={() =>
                      handleSelectPost(
                        post
                      )
                    }
                  >

                    <div
                      className={`list-dot ${post.platform.toLowerCase()}`}
                    />

                    <div className="list-info">

                      <strong>
                        {post.title}
                      </strong>

                      <span>
                        {post.platform}
                      </span>

                    </div>

                    <div className="list-date">
                      {shortDate(
                        parseDate(
                          post.date
                        )
                      )}

                      <span>
                        {post.time}
                      </span>
                    </div>

                  </div>

                )
              )

            )}

          </section>

        )}


        {/* =================================
            STATISTICS
        ================================= */}

        <Statistics
          posts={posts}
        />


        {/* =================================
            SELECTED POST
        ================================= */}

        {selectedPost && (

          <section className="selected-panel">

            <div>

              <span className="panel-label">
                SELECTED POST
              </span>

              <h3>
                {selectedPost.title}
              </h3>

              <p>
                <strong>
                  Platform:
                </strong>{" "}
                {selectedPost.platform}
              </p>

              <p>
                <strong>
                  Date:
                </strong>{" "}
                {shortDate(
                  parseDate(
                    selectedPost.date
                  )
                )}
                {" · "}
                {selectedPost.time}
              </p>

            </div>


            <div className="panel-actions">

              <button
                className="edit-button"
                onClick={() =>
                  openEditModal(
                    selectedPost
                  )
                }
              >
                Edit
              </button>

              <button
                className="delete-button"
                onClick={
                  deletePost
                }
              >
                Delete
              </button>

            </div>

          </section>

        )}

      </main>


      {/* =================================
          CREATE / EDIT MODAL
      ================================= */}

      {showModal && (

        <div
          className="modal-overlay"
          onClick={() =>
            setShowModal(false)
          }
        >

          <div
            className="modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <span className="panel-label">
                  POST SCHEDULER
                </span>

                <h3>
                  {editingPost
                    ? "Edit Post"
                    : "Create New Post"}
                </h3>

              </div>

              <button
                className="close-button"
                onClick={() =>
                  setShowModal(false)
                }
              >
                ×
              </button>

            </div>


            <form
              onSubmit={savePost}
            >

              <label>
                Post Title

                <input
                  name="title"
                  value={
                    form.title
                  }
                  onChange={
                    handleFormChange
                  }
                  placeholder="Enter post title"
                  required
                />

              </label>


              <label>
                Platform

                <select
                  name="platform"
                  value={
                    form.platform
                  }
                  onChange={
                    handleFormChange
                  }
                >

                  <option>
                    Instagram
                  </option>

                  <option>
                    Facebook
                  </option>

                  <option>
                    LinkedIn
                  </option>

                </select>

              </label>


              <div className="form-row">

                <label>
                  Date

                  <input
                    type="date"
                    name="date"
                    value={
                      form.date
                    }
                    onChange={
                      handleFormChange
                    }
                  />

                </label>


                <label>
                  Time

                  <input
                    type="time"
                    name="time"
                    value={
                      form.time
                    }
                    onChange={
                      handleFormChange
                    }
                  />

                </label>

              </div>


              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  {editingPost
                    ? "Save Changes"
                    : "Schedule Post"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}


export default App;
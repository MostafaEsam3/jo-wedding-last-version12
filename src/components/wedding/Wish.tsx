import { useEffect, useState } from 'react';

import {
  createWish,
  getWishes,
} from '../../Services/wishesApi.tsx';

import './guest.css';

export default function GuestBook() {
  const [form, setForm] = useState({
    name: '',
    relationship: 'Friend',
    message: '',
    willAttend: false,
  });

  const [wishes, setWishes] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function loadWishes(page = 1, append = false) {
    try {
      setLoading(true);
      setError('');

      const response = await getWishes(page, 5);

      if (append) {
        setWishes((previous) => [
          ...previous,
          ...response.data,
        ]);
      } else {
        setWishes(response.data);
      }

      setPagination(response.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWishes(1);
  }, []);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError('');

      await createWish(form);

      setForm({
        name: '',
        relationship: 'Friend',
        message: '',
        willAttend: false,
      });

      // بعد إضافة Wish جديدة نرجع لأول 5
      await loadWishes(1, false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleLoadMore() {
    if (!pagination.hasNextPage || loading) {
      return;
    }

    loadWishes(pagination.page + 1, true);
  }

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-2xl">

        {/* FORM */}
        <div
          className="
            rounded-[30px]
            border
            p-6
            shadow-xl
            backdrop-blur-sm
            md:p-10
            guest
          "
        >
          <h2
            className="
              mb-2
              text-3xl
              font-semibold
              not-italic
              font-script
              text-burgundy-deep
              md:text-5xl
            "
          >
            Write your wishes ✍️
          </h2>

          <div className="mb-8 h-px bg-[hsl(var(--gold)/0.35)]" />

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* NAME */}
            <div>
              <label
                className="
                  mb-2
                  block
                  font-medium
                  not-italic
                  text-[hsl(var(--gold))]
                "
              >
                Your Name
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Write your name here..."
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-[hsl(var(--gold)/0.4)]
                  bg-white/95
                  px-4
                  py-4
                  font-normal
                  not-italic
                  text-gray-900
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-[hsl(var(--gold))]
                "
              />
            </div>

            {/* RELATIONSHIP */}
            <div>
              <label
                className="
                  mb-2
                  block
                  font-medium
                  not-italic
                  text-[hsl(var(--gold))]
                "
              >
                Relationship
              </label>

              <select
                name="relationship"
                value={form.relationship}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-[hsl(var(--gold)/0.4)]
                  bg-white
                  px-4
                  py-4
                  font-normal
                  not-italic
                  text-gray-900
                  outline-none
                  focus:border-[hsl(var(--gold))]
                "
              >
                <option value="Friend">
                  Friend
                </option>

                <option value="Family">
                  Family
                </option>

                <option value="Colleague">
                  Colleague
                </option>

                <option value="Well-wisher">
                  Well-wisher
                </option>
              </select>
            </div>

            {/* MESSAGE */}
            <div>
              <label
                className="
                  mb-2
                  block
                  font-medium
                  not-italic
                  text-[hsl(var(--gold))]
                "
              >
                Wishes / Message
              </label>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your wishes for the couple here..."
                required
                rows={6}
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-[hsl(var(--gold)/0.4)]
                  bg-white/95
                  px-4
                  py-4
                  font-normal
                  not-italic
                  text-gray-900
                  outline-none
                  placeholder:text-gray-400
                  focus:border-[hsl(var(--gold))]
                "
              />
            </div>

            {/* ATTENDANCE */}
            <label
              style={{
                backgroundColor: 'darkslategrey',
              }}
              className="
                flex
                cursor-pointer
                items-center
                gap-4
                rounded-2xl
                border
                border-[hsl(var(--gold)/0.45)]
                bg-[hsl(var(--burgundy-deep)/0.45)]
                p-5
              "
            >
              <input
                type="checkbox"
                name="willAttend"
                checked={form.willAttend}
                onChange={handleChange}
                className="h-6 w-6"
              />

              <div>
                <div
                  className="
                    font-medium
                    not-italic
                    text-sm
                    text-burgundy-deep
                  "
                >
                  Yes, I will attend the wedding
                </div>

                <div
                  className="
                    font-normal
                    not-italic
                    text-burgundy-deep
                    text-sm
                  "
                >
                  Your attendance is saved with your wish
                </div>
              </div>
            </label>

            {/* ERROR */}
            {error && (
              <div
                className="
                  rounded-xl
                  bg-red-50
                  p-4
                  text-red-700
                "
              >
                {error}
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={submitting}
              className="
                w-full
                rounded-full
                border
                border-[hsl(var(--gold))]
                bg-[hsl(var(--gold))]
                px-6
                py-4
                text-lg
                font-semibold
                not-italic
                text-[hsl(var(--burgundy-deep))]
                transition
                hover:opacity-90
                disabled:opacity-60
              "
            >
              {submitting
                ? 'Sending...'
                : '✈ Send Wishes'}
            </button>
          </form>
        </div>


        {/* WISHES */}
        <div className="mt-10 space-y-5">

          {/* أول تحميل فقط */}
          {loading && wishes.length === 0 && (
            <div
              className="
                text-center
                font-extrabold
                text-lg
                text-[hsl(var(--gold))]
              "
            >
              Loading wishes...
            </div>
          )}

          {wishes.map((wish) => (
            <div
              key={wish._id}
              className="
                rounded-3xl
                border
                border-[hsl(var(--gold)/0.3)]
                bg-cream
                p-6
                shadow-lg
                backdrop-blur-sm
                text-burgundy-deep
              "
            >
              <div
                className="
                  mb-4
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >
                <h3
                style={{
                  fontFamily: 'cursive',
                }}
                  className="
                    text-2xl
                    font-semibold
                    not-italic
                  "
                >
                  {wish.name}
                </h3>

                <span 
                style={{
                    border:"1px solid "
                }}
                  className="
                    rounded-full
                    border
                    border-[hsl(var(--gold)/0.4)]
                    px-4
                    py-1
                    text-xl
                    font-normal
                    not-italic
                    text-burgundy-deep
                  "
                >
                  {wish.relationship}
                </span>
              </div>

              <div
                className="
                  mb-4
                  border-t
                  border-dashed
                  border-[hsl(var(--gold)/0.3)]
                "
              />

              <p
                className="
                  whitespace-pre-wrap
                  text-xl
                  font-normal
                  not-italic
                  leading-8
                  text-burgundy-deep
                "
              >
                {wish.message}
              </p>

              {wish.willAttend && (
                <div
                  className="
                    mt-4
                    text-sm
                    font-medium
                    not-italic
                    text-burgundy-deep
                  "
                >
                  ✓ Attending the wedding
                </div>
              )}

              <div
                className="
                  mt-5
                  text-right
                  text-sm
                  font-normal
                  not-italic
                  text-burgundy-deep
                "
              >
                {new Date(
                  wish.createdAt
                ).toLocaleDateString()}
              </div>
            </div>
          ))}

        </div>


        {/* LOAD MORE */}
        {pagination.hasNextPage && (
          <div
            className="
              mt-8
              flex
              justify-center
            "
          >
            <button
              type="button"
              disabled={loading}
              onClick={handleLoadMore}
              className="
                min-w-[180px]
                rounded-full
                border
                border-[hsl(var(--gold))]
                bg-[hsl(var(--gold))]
                px-8
                py-3
                text-lg
                font-semibold
                not-italic
                text-[hsl(var(--burgundy-deep))]
                transition
                hover:opacity-90
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading
                ? 'Loading...'
                : 'Load More'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
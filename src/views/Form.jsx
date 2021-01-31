import React, { Fragment, useState, useRef, useEffect } from 'react';
import { getCategories } from 'services/index';
import './Form.scss';

const Form = () => {
  const [payload, setPayload] = useState({
    name: '',
    category: '',
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const submitBtn = useRef();

  useEffect(() => {
    fetchCategories();
    //eslint-disable-next-line
  }, []);

  const fetchCategories = async () => {
    try {
      let res = await getCategories();
      await setCategories([...res.data.data]);
    } catch (err) {
      setError('Unable to fetch categories');
    }
    await setLoading(false);
  };

  const onChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, category } = payload;
    if (name === '' || category === '') {
      setError('Please fill in all fields');
    } else {
      setSelectedCategory(category);
      submitBtn.current.innerHTML = 'Submitted';
    }
  };

  return (
    <Fragment>
		  <section className="container">
			  <h2>Register Here</h2>
        {loading ? (
          <p>Loading categories</p>
        ) : categories.length > 0 ? (
          <Fragment>
            <section className="content">
              {selectedCategory.length > 0 && <h4>Selected Category : {selectedCategory}</h4>}

              <form onSubmit={handleSubmit} method="post">
                <p>{error}</p>
                <div className="form__group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="name"
                    name="name"
                    className="form-control"
                    value={payload.name}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form__group">
                  <select name="category" onChange={onChange} required>
                    <option value="">-- Choose Service --</option>
                    {categories.length > 0 &&
                      categories.map((category) => {
                        return (
                          <option value={category.name} key={category.id}>
                            {category.name}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <button ref={submitBtn} type="submit" className="btn  btn-blue">
                  Submit
                </button>
              </form>
            </section>
          </Fragment>
        ) : (
          <p>No categories yet</p>
        )}
      </section>
    </Fragment>
  );
};

export default Form;

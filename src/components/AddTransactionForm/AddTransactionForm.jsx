import { useEffect, useMemo, useRef, useState } from 'react';
import { Formik } from 'formik';
import DatePicker from 'react-datepicker';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import {
  addTransaction,
  fetchCategories,
} from '../../redux/finance/financeOperations';
import { selectCategories } from '../../redux/finance/financeSelectors';
import styles from './AddTransactionForm.module.css';
import calendarIcon from '@/assets/icons/calendar-icon.svg';
import CursorPointerIcon from '@/assets/icons/cursor-pointer-icon.svg?react';
import { toast } from 'react-toastify';

const fallbackExpenseCategories = [
  'Main expenses',
  'Products',
  'Car',
  'Self care',
  'Child care',
  'Household products',
  'Education',
  'Leisure',
  'Other expenses',
  'Entertainment',
];

const getValidationSchema = () =>
  Yup.object({
    type: Yup.string()
      .oneOf(['INCOME', 'EXPENSE'])
      .required('Transaction type is required'),
    category: Yup.string().when('type', {
      is: 'EXPENSE',
      then: (schema) => schema.required('Category is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
    amount: Yup.number()
      .typeError('Sum must be a number')
      .moreThan(0, 'Sum must be greater than 0')
      .required('Sum is required'),
    date: Yup.date()
      .typeError('Enter a valid date')
      .max(new Date(), 'Date cannot be in the future')
      .required('Date is required'),
    comment: Yup.string().trim().required('Comment is required'),
  });

const formatTransactionDate = (value) => {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const normalizeCategory = (item) => {
  if (typeof item === 'string') {
    return { id: item, name: item, type: 'EXPENSE' };
  }

  return {
    id: item.id ?? item._id ?? item.name,
    name: item.name ?? item.categoryName ?? '',
    type: String(item.type ?? item.transactionType ?? '').toUpperCase(),
  };
};

const AddTransactionForm = ({ onSuccess = () => {} }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories) ?? [];
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryRef = useRef(null);

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [categories.length, dispatch]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  const expenseCategories = useMemo(() => {
    const normalizedCategories = categories
      .map(normalizeCategory)
      .filter((item) => item.name && item.type !== 'INCOME');

    return normalizedCategories.length
      ? normalizedCategories
      : fallbackExpenseCategories.map((item) => normalizeCategory(item));
  }, [categories]);

  return (
    <Formik
      initialValues={{
        type: 'EXPENSE',
        category: '',
        amount: '',
        date: new Date(),
        comment: '',
      }}
      validationSchema={getValidationSchema}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        const selectedCategory = expenseCategories.find(
          (item) => item.name === values.category
        );

        const amount = Number(values.amount);
        const payload = {
          type: values.type,
          amount: values.type === 'EXPENSE' ? -amount : amount,
          transactionDate: formatTransactionDate(values.date),
          comment: values.comment.trim(),
          ...(values.type === 'EXPENSE' && {
            categoryId: selectedCategory?.id ?? values.category,
          }),
        };

        try {
          await dispatch(addTransaction(payload)).unwrap();
          resetForm();
          onSuccess();
        } catch {
          toast.error('Failed to add transaction. Please try again.');
          setSubmitting(false);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldTouched,
        setFieldValue,
        isSubmitting,
      }) => {
        const isExpense = values.type === 'EXPENSE';
        const categoryError = touched.category && errors.category;

        return (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.typeSwitch}>
              <button
                type="button"
                className={
                  values.type === 'INCOME'
                    ? styles.activeType
                    : styles.typeLabel
                }
                onClick={() => {
                  setFieldValue('type', 'INCOME');
                  setFieldValue('category', '');
                  setFieldTouched('category', false);
                  setIsCategoryOpen(false);
                }}
              >
                Income
              </button>

              <div className={styles.toggleTrack} aria-hidden="true">
                <button
                  type="button"
                  className={`${styles.toggleButton} ${
                    values.type === 'INCOME'
                      ? styles.toggleIncome
                      : styles.toggleExpense
                  }`}
                  tabIndex={-1}
                >
                  {values.type === 'INCOME' ? '+' : '-'}
                </button>
              </div>

              <button
                type="button"
                className={
                  values.type === 'EXPENSE'
                    ? styles.activeType
                    : styles.typeLabel
                }
                onClick={() => {
                  setFieldValue('type', 'EXPENSE');
                }}
              >
                Expense
              </button>
            </div>

            {isExpense && (
              <div className={styles.fieldGroup}>
                <div className={styles.categoryField} ref={categoryRef}>
                  <button
                    type="button"
                    className={`${styles.categoryTrigger} ${
                      isCategoryOpen ? styles.categoryTriggerOpen : ''
                    } ${values.category ? styles.categorySelected : ''} ${
                      categoryError ? styles.fieldInvalid : ''
                    }`}
                    onClick={() => setIsCategoryOpen((open) => !open)}
                    onBlur={() => setFieldTouched('category', true)}
                    aria-haspopup="listbox"
                    aria-expanded={isCategoryOpen}
                  >
                    <span>{values.category || 'Select a category'}</span>
                    <span className={styles.categoryTriggerIcons}>
                      <span
                        className={`${styles.categoryChevron} ${
                          isCategoryOpen ? styles.categoryChevronOpen : ''
                        }`}
                        aria-hidden="true"
                      />
                    </span>
                  </button>

                  {isCategoryOpen && (
                    <ul className={styles.categoryMenu} role="listbox">
                      {expenseCategories.map((item) => (
                        <li key={item.id}>
                          <button
                            type="button"
                            className={`${styles.categoryOption} ${
                              item.name === values.category
                                ? styles.categoryOptionActive
                                : ''
                            }`}
                            onClick={() => {
                              setFieldValue('category', item.name);
                              setFieldTouched('category', true, false);
                              setIsCategoryOpen(false);
                            }}
                          >
                            <span>{item.name}</span>
                            {item.name === values.category && (
                              <CursorPointerIcon
                                className={styles.categoryOptionPointer}
                                aria-hidden="true"
                              />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {categoryError && (
                  <p className={styles.errorText}>{errors.category}</p>
                )}
              </div>
            )}

            <div className={styles.row}>
              <div className={styles.fieldGroup}>
                <div
                  className={`${styles.amountField} ${
                    touched.amount && errors.amount ? styles.fieldInvalid : ''
                  }`}
                >
                  <input
                    className={styles.amountInput}
                    type="number"
                    name="amount"
                    placeholder="0.00"
                    step="0.01"
                    value={values.amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {touched.amount && errors.amount && (
                  <p className={styles.errorText}>{errors.amount}</p>
                )}
              </div>

              <div className={styles.fieldGroup}>
                <div
                  className={`${styles.dateField} ${
                    touched.date && errors.date ? styles.fieldInvalid : ''
                  }`}
                >
                  <DatePicker
                    selected={values.date}
                    onChange={(value) =>
                      setFieldValue('date', value ?? new Date())
                    }
                    onBlur={() => setFieldTouched('date', true)}
                    dateFormat="dd.MM.yyyy"
                    placeholderText="07.07.2023"
                    className={styles.dateInput}
                    maxDate={new Date()}
                  />
                  <img
                    className={styles.dateIcon}
                    src={calendarIcon}
                    alt="Calendar icon"
                  />
                </div>
                {touched.date && errors.date && (
                  <p className={styles.errorText}>{errors.date}</p>
                )}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <div
                className={`${styles.commentField} ${
                  touched.comment && errors.comment ? styles.fieldInvalid : ''
                }`}
              >
                <input
                  className={styles.commentInput}
                  type="text"
                  name="comment"
                  placeholder="Comment"
                  value={values.comment}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {touched.comment && errors.comment && (
                <p className={styles.errorText}>{errors.comment}</p>
              )}
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add'}
            </button>
          </form>
        );
      }}
    </Formik>
  );
};

export default AddTransactionForm;

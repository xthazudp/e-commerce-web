import React from 'react';

export const SubmitButton = (props) => {
  const disabledLabel = props.disabledLabel || 'submitting...';
  const enabledLabel = props.enabledLabel || 'submit';
  let btn = props.isSubmitting ? (
    <button disabled className='btn btn-info btn-sm'>
      {disabledLabel}
    </button>
  ) : (
    <button
      type='submit'
      disabled={props.isDisabled}
      className='btn btn-warning btn-sm'
    >
      {enabledLabel}
    </button>
  );
  return btn;
};

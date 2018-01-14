import React from 'react';
import Range from 'vital-components/Range';

// TODO: Move SongOption to its own file
const SongOption = ({
  optionId,
  source,
  name,
  title,
  onUpdateValue
}) => {
  return (<div>
    <input
      type="radio"
      name={name}
      id={`song-option-${optionId}`}
      onClick={event => onUpdateValue({ optionId, source })}
    />
    <label htmlFor={`song-option-${optionId}`}>{title}</label>
  </div>);
};

export default [
  {
    id: 'song',
    label: 'Choose an EDM mix',
    optionComponent: SongOption,
    optionComponentProps: [
      {
        optionId: 'ultimate-club-mix',
        name: 'songOption',
        title: 'Deadmau5 ultimate club mix',

        // TODO: This is going to break. Temporary workaround because
        // I'm having many issues with Google Cloud buckets.
        source: 'https://00e9e64bacb42b469a8ea1a58dbd4e0d1c7106fd86a92890db-apidata.googleusercontent.com/download/storage/v1/b/databassio/o/deadmau5-club-mix.mp3?qk=AD5uMEutUdGbKvoMy3Tw_jexXE0c-4RLBh_kAUEkQReTULBY2_lAaWoj8CKyohxqUgKV5fmaUFJICJTN7-bU_uUHebNTuxX3YXvQA1pP7RRqsS-BKZqTzh4_4nRo_7cIjmH4xhgslvSUOlZW08y_87xIS9PZybjmDMrpgjbOnIJ85UXbBtCgKhvdvNodbdA9k-tT6nn2tCH6c1WCbvlhjAHME1nY4YIYfO2ba-FwFquBWD2vgga59WSUqipBea1FY3ajRKfIZe71tz8Lr2KHhzdXqyHtIvLX-jgG-v8sa-ONINOkqpQ_5UNWNH46qfuiQdAJTk-aidu2asEIMjsbEKSUm9Bhie9E8rx3jI2XcJs7IDAI26BKLKgHfSQVtra5mRfiIMstWw8EvA6PlKOcvxnWJODI5IlFlZUI3Uy72Dk1EBw5AsJl46z28taKMJtGpR4qhYCiidxMKJZu5Qy3fwHYruR2-vUXYWmS4BF41ajQXHP7801fME3QR6MzfXz1DiNZREuQaazN3SMZ-ysM7Z1wIETMb_cfTUruhXg7fE_c4y7EatJLAhGawluvEA9_2rzgX8x-OiR4U39sQc9h9_ghVgJCN-3og3T9W9aHlAv29oeNOlSL_Y5PaqX2scoS1NX8vtruEukB2rxMFtb37jws-ZBHbNKFNcO5Sxoa3zo836yt-f_lvPvyMmpT43JChzT63TH7yj648pZ1DDk1CM74zcxDyetmed3WzZ9vs9Adli1UbuPp6_0'
      },
      {
        optionId: 'extreme-bass-boost',
        name: 'songOption',
        title: 'Extreme Bass Boost',
        source: 'https://storage.cloud.google.com/databassio/extreme-bass-boost.mp3'
      },
      {
        optionId: 'a-walk',
        name: 'songOption',
        title: 'A Walk',
        source: './sounds/tycho-a-walk.wav'
      },
      {
        optionId: 'when-will-the-bass-drop',
        name: 'songOption',
        title: 'When will the bass drop?',
        source: 'https://00e9e64bac31131c94a304323cde60b13bd04ee239b68224d7-apidata.googleusercontent.com/download/storage/v1/b/databassio/o/bass-drop.wav?qk=AD5uMEstOx-h0prjeEcqRJuQ6fblqLr_i7oxB17oLhezL1c4CXBA6CkL7Lr0oS5FXmjrE7_2UXgOa4mUUDdLEYKmb65CbQ9KNrpU3GRGjmU0EqV3-RgyxSnw9i7aENKiXhsIwKamnF8ORFgfSCmlu7wd8RPuqhc7CJxDfiLr5TNMRDjStlpPSs8YaE7cK2ZCrN4nYedaeHSyzI4Oa2WBDmGQESB8FGYBCweO9EjwBlC74TRAzNfcPeKPyxE6sY3VT_LHX6hs7pKljLZUAcFtaZbKhjkkq6rMdwRkhjtts-3a3GnTXuUTPykXAPv4dQHqlIMiMJ6kmIn9HqAKCosUKJmbkyNRTy-4cqMy0zlqG6O7g3rZwChhxG9lEMMcB1-TdPy9h3mf69KbzkdIlULNhY8KG3N5qgZGqr41jNTk0d0sZLl60_J2RaObtPnNt0B6kKYC-geOBtSlJtsHvdJ5EhF-6i36DqZ_ZleuWvYlOprPCyz0e420fVNaH19yOzw4gkMDY85SAk9FOmPlnW1dGy2n07l4RxxbNwERaFvW0slFpZKr_CxfLIeHMB0hz9RNnluHq6YMD32j8WY6qNLetC70mtabUxsqaBN1ORTihRKvqcG5Ki_2fmpp5kcZTZtVZC_MX8iPKMjeQm4KPxl2JP-8PxP5jYJt3Sqh5cIOC3W0pIkVuwsQaSZxAjLvDDIAiA6IkkklYeYKyc1oti-1TxOPWXxFql6Jq9_pq8AEjzOcSNKtgQPxFOM'
      },
    ]
  },
  {
    id: 'maxSpeed',
    label: 'Maximum speed',
    helpText: 'How much the song speed will increase as you run',
    optionComponent: Range,
    optionComponentProps: [
      {
        min: 1.0,
        max: 3.0
      }
    ]
  },
  {
    id: 'minSpeed',
    label: 'Minimum speed',
    helpText: 'How much the song will slow down when you stop',
    optionComponent: Range,
    optionComponentProps: [
      {
        min: 0.0,
        max: 1.0
      }
    ]
  }
];
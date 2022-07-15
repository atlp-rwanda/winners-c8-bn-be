const socialAuthData = {};

socialAuthData.google = {
    "provider": "google",
    "sub": "1131381305544069851",
    "id": "1131381305544069851",
    "displayName": "John Doe",
    "name": {
      "givenName": "John",
      "familyName": "Doe"
    },
    "givenName": "John",
    "familyName": "Doe",
    "email_verified": true,
    "verified": true,
    "language": "en",
    "email": "jane.doe@test.com",
    "emails": [
      {
        "value": "jane.doe@test.com",
        "type": "account"
      }
    ],
    "photos": [
      {
        "value": "https://lpictures96-c",
        "type": "default"
      }
    ],
    "picture": "https://lpictures96-c",
    "_raw": "{\n  \"sub\": \"113138130554406985541\",\n  \"name\": \"John Doe\",\n  \"given_name\": \"John\",\n  \"family_name\": \"Doe\",\n  \"picture\": \"https://lh3.googleusercontent.com/a-/AFdZucpatnyPXA4q9198j6E3SQnuR1MuoPuuvSMQiM3l9A\\u003ds96-c\",\n  \"email\": \"jane.doe@test.com\",\n  \"email_verified\": true,\n  \"locale\": \"en\"\n}",
    "_json": {
      "sub": "113138130554406985541",
      "name": "John Doe",
      "given_name": "John",
      "family_name": "Doe",
      "picture": "https://lpictures96-c",
      "email": "jane.doe@test.com",
      "email_verified": true,
      "locale": "en"
    }
  };

socialAuthData.facebook =  {
    "id": "2087518",
    "name": {
      "familyName": "Doe",
      "givenName": "Jacob"
    },
    "emails": [
      {
        "value": "jacob.doe@test.com"
      }
    ],
    "photos": [
      {
        "value": "https://platform-picturefilepic/?asid=2082912571877518&height=50&width=50&ext=1660121410&hash=AeRSfL_9ngfikWlOn2Q"
      }
    ],
    "provider": "facebook",
    "_raw": "{\"picture\":{\"data\":{\"height\":50,\"is_silhouette\":false,\"url\":\"https:\\/\\/platform-lookaside.fbsbx.com\\/platform\\/profilepic\\/?asid=2082912571877518&height=50&width=50&ext=1660121410&hash=AeRSfL_9ngfikWlOn2Q\",\"width\":50}},\"email\":\"smbonimpa2011\\u0040gmail.com\",\"last_name\":\"Doe\",\"first_name\":\"Pac\\u00f4me Simon\",\"id\":\"2082912571877518\"}",
    "_json": {
      "picture": {
        "data": {
          "height": 50,
          "is_silhouette": false,
          "url": "https://platform-pikWlOn2Q",
          "width": 50
        }
      },
      "email": "jacob.doe@test.com",
      "last_name": "Doe",
      "first_name": "Jacob",
      "id": "20827518"
    }
  };

  socialAuthData.fb_no_email =  {
    "id": "2087518",
    "name": {
      "familyName": "Doe",
      "givenName": "Jacob"
    },
    "emails": [
    ],
    "photos": [
      {
        "value": "https://platform-picturefilepic/?asid=2082912571877518&height=50&width=50&ext=1660121410&hash=AeRSfL_9ngfikWlOn2Q"
      }
    ],
    "provider": "facebook",
    "_raw": "{\"picture\":{\"data\":{\"height\":50,\"is_silhouette\":false,\"url\":\"https:\\/\\/platform-lookaside.fbsbx.com\\/platform\\/profilepic\\/?asid=2082912571877518&height=50&width=50&ext=1660121410&hash=AeRSfL_9ngfikWlOn2Q\",\"width\":50}},\"email\":\"smbonimpa2011\\u0040gmail.com\",\"last_name\":\"Doe\",\"first_name\":\"Pac\\u00f4me Simon\",\"id\":\"2082912571877518\"}",
    "_json": {
      "picture": {
        "data": {
          "height": 50,
          "is_silhouette": false,
          "url": "https://platform-pikWlOn2Q",
          "width": 50
        }
      },
      "email": "jacob.doe@test.com",
      "last_name": "Doe",
      "first_name": "Jacob",
      "id": "20827518"
    }
  };
export default socialAuthData;
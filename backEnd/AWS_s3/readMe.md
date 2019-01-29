1. Create an AWS S3 Bucket

//AWS S3 Bucket details //ranjith
bucketName = 'cmpe273bucket';

2. create IAM user and NOTE DOWN the below one time generated credentials.

IAM_userKey = 'AKIAJ4J3CVFRPQG3MY5Q';
IAM_userSecret = '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';

3. go to bucket --> permissions --> bucket policy
//add the below code : make sure you put correct bucketname in resource && user details in principal/AWS ( get 'arn:aws:iam::' details from user info in IAM)
{
    "Version": "2012-10-17",
    "Id": "Policy1488494182833",
    "Statement": [
        {
            "Sid": "Stmt1488493308547",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::392320685985:user/ranjith"
            },
            "Action": [
                "s3:Get*",
                "s3:Put*"
            ],
            "Resource": "arn:aws:s3:::cmpe273bucket/*"
        }
    ]
}

4. Update CORS Configuration as below :
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>POST</AllowedMethod>
    <AllowedMethod>PUT</AllowedMethod>
    <MaxAgeSeconds>3000</MaxAgeSeconds>
    <AllowedHeader>Authorization</AllowedHeader>
</CORSRule>
</CORSConfiguration>

5. uploading the file can be done as in S3BucketOperations.js using user credentials.




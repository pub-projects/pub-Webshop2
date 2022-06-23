
//** Use exclusion to exclude data that shouldn't be sent to the client. */
export const userObjectToClientProjection = {
    "login.uuid": 0,
    "login.salt": 0,
    "login.md5": 0,
    "login.sha1": 0,
    "login.sha256": 0
}

export const removeNonClientLoginProperties = [
    "uuid",
    "salt",
    "md5",
    "sha1",
    "sha256"
]
import base64

text = "hello world!"

encoded = text.encode(base64)
print(encoded)

decoded = encoded.decode('ASCII')
print(decoded)
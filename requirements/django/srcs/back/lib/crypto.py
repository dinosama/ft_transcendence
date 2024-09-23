from                django.conf import settings
from              Crypto.Cipher import AES
from              Crypto.Random import get_random_bytes
from        Crypto.Util.Padding import pad, unpad
from                Crypto.Hash import SHA256
import base64

class AesCrypto:
    def __init__(self):
        sha256 = SHA256.new()
        sha256.update(settings.TWOFA_SECRET.encode('utf-8'))
        self._key = sha256.digest()

    def cbcEncrypt(self, plaintext):
        iv = get_random_bytes(AES.block_size)
        
        cipher = AES.new(
          self._key,
          AES.MODE_CBC,
          iv
        )
        
        padded_plaintext = pad(plaintext.encode('utf-8'), AES.block_size)
        ciphertext_bytes = cipher.encrypt(padded_plaintext)
        encrypted_data = base64.b64encode(iv + ciphertext_bytes)
        return encrypted_data.decode('utf-8')

    def cbcDecrypt(self, ciphertext):
        ciphertext_bytes = base64.b64decode(ciphertext)
        iv = ciphertext_bytes[:AES.block_size]

        cipher = AES.new(
          self._key,
          AES.MODE_CBC,
          iv
        )

        decrypted_data = cipher.decrypt(ciphertext_bytes[AES.block_size:])
        plaintext = unpad(decrypted_data, AES.block_size).decode('utf-8')
        return plaintext
from django.core.exceptions import ValidationError

class WorkPilotPasswordValidator:
    
    def validate(self, password, user=None):
        
        errors = []
        
        if not any(char.isupper() for char in password):
            errors.append("Password must contain an uppercase letter.")
            
        if not any(char.islower() for char in password):
            errors.append("Password must contain a lowercase letter.")
            
        if not any(char.isdigit() or not char.isalnum() for char in password):
            errors.append("Password must contain a number or symbol.")
            
        if errors:
            raise ValidationError(errors)
        
    def get_help_text(self):
        return (
            "Password must contain uppercase and lowercase "
            "letters, and at least one number or symbol."
        )
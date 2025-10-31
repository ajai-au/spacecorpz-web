from django import forms

class CollaborationForm(forms.Form):
    name = forms.CharField(max_length=100, label="Your Name")
    company = forms.CharField(max_length=150, label="Company or Organisation Name")
    email = forms.EmailField(label="Email Address")
    interest = forms.CharField(max_length=200, label="Area You’re Interested to Collaborate In")
    message = forms.CharField(widget=forms.Textarea, label="Short Note")
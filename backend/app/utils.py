def parse_number(value):
    """
    Safely parse numeric values from JSON.
    If value is 'NaN', None, or empty string, returns None.
    Otherwise, returns float(value).
    """
    if value in ["NaN", None, ""]:
        return None
    try:
        return float(value)
    except:
        return None

# HOW TO SUPPORT NEW STIX/CYBOX ELEMENTS

## STEP 1: Add Support to Print References

### 1a: Input Document Normalization

The source xml document is normalized via normalize.xsl.  This is done by the variable declaration and assignment of $normalize and $reference at the top of the root template (match="/") in stix_to_html.xsl.

[TIP: Search for "HELP_UPDATE_STEP_1A" in stix_to_html.xsl].

You shouldn't have to make any changes here.


### 1b: Updating normalize.xsl

Normally normalize.xsl doesn't need to be updated for new elements, but if you have an element that uses id references but does nto use @idref, update the following template so that the @whatever_reference attributes are converted to @idref in the normalization.

```XSLT
<xsl:template match="@object_reference|@action_id" mode="createReference" priority="20.0">
  <xsl:attribute name="idref" select="fn:data(.)" />
</xsl:template>
```

[TIP: Search for "HELP_UPDATE_STEP_1B" in stix_to_html.xsl]


### 1c: Updating HTML for "Reference" Templates

This is where the actual HTML shows up for when an item is expanded.

This code is generated by the "printReference" template.  Here is where it is called in stix_to_html.xsl:

```
<xsl:call-template name="printReference">
  <xsl:with-param name="reference" select="$reference" />
  <xsl:with-param name="normalized" select="$normalized" />
</xsl:call-template>
```

[TIP: Search for "HELP_UPDATE_STEP_1C" in stix_to_html.xsl]

The named template "printReference" just goes on to call xsl:apply-templates on $reference with the mode "printReference".


### 1d: Updating mode="printReference" Templates

Be sure to upate one of the following two templates to add your element to the list of elements in the match:

```
<xsl:template match="cybox:Observable|indicator:Observable|stix:Indicator|stix:TTP|stixCommon:Kill_Chain|stixCommon:Kill_Chain_Phase|stix:Campaign|stix:Incident|stix:Threat_Actor|stixCommon:Exploit_Target|cybox:Action" mode="printReference">
```

```
<xsl:template match="cybox:Object|cybox:Related_Object|stixCommon:Kill_Chain|stixCommon:Course_Of_Action|stix:Course_Of_Action" mode="printReference">
```

[TIP: Search for "HELP_UPDATE_STEP_1D" (this will show up twice)]


### 1e: Linking the Main Stylesheet to Your New Element Details

Then go on to add support in either "printGenericItemForReferenceList" (in stix_to_html.xsl) or "printObjectForReferenceList" (in cybox_common.xsl) as appropriate.

In most cases, you'll be updating "printGenericItemForReferenceList".  For this template, go to the bottom and update the xsl:choose structure to add an entry for the new element.  Most of the items here either call a named template or use a rule-based template.

[TIP: Search for "HELP_UPDATE_STEP_1E" (this will show up once each in stix_to_html.xsl and cybox_common.xsl)]




## STEP 2: Add Support for Printing Element Details

Create a named template or a rule-based template.  It should be linked in from step 1e above.  

If you use a rule based template, please make sure to make the match expression only match on those occurrences with an id attribute, like this:

```
<xsl:template match="cybox:Action[@id]">
```

Most of these are in either stix_common.xsl or cybox_common.xsl.

[TIP: Search for "HELP_UPDATE_STEP_2" in cybox_common.xsl and this will show you the support for cybox:Action]


## STEP 3: Add Support for Expandable Headings

Update the template that matches the elements with idref attributes for the expandable heading to show up properly.

The template that you should update looks like this in cybox_common.xsl:

```
<xsl:template match="cybox:Object[@idref]|cybox:Event[@idref]|cybox:Related_Object[@idref]|cybox:Associated_Object[@idref]|stixCommon:Course_Of_Action[@idref]|stix:Course_Of_Action[@idref]|cybox:Action[@idref]|cybox:Action_Reference[@idref]">
```

[TIP: Search for "HELP_UPDATE_STEP_3" in cybox_common.xsl]
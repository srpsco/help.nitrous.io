# help.action.io output

1. Run punch generate to get the full output in the master branch

    punch generate

2. Checkout gh-pages branch

    git checkout gh-pages

3. Move the newly generated output to root directory

    mv output .

4. Commit the new output

    git commit -m "help updates [datetime]"

5. Push to github pages

    git push origin gh-pages

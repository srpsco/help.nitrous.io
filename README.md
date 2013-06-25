# help.action.io output

1. In *master*, run punch generate to get the full output in the

    punch generate

2. Checkout gh-pages branch

    git checkout gh-pages

3. Move the newly generated output to root directory

    mv output/* .

4. Remove the empty output folder

    rm -rf output

5. Stage the new output

    git add .

6. Commit the new output

    git commit -m "help updates [datetime]"

7. Push to github pages

    git push origin gh-pages

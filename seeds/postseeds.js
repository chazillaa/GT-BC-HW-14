const { Post } = require('../models')

const posts = [
    {
        post_name: 'The Good and Bad of ChatGPT in Schools',
        post_data: 'Nothing strikes dread in a students heart quite like facing down a deadline on a seven-page essay. Thats why some of them may find it tempting to turn those hours of work into a task that can be breezed through in a matter of seconds by an AI-powered app.',
        user_id: 1
    },
    {
        post_name: 'The FBI Just Admitted It Bought US Location Data',
        post_data: 'Rather than obtaining a warrant, the bureau purchased sensitive data—a controversial practice that privacy advocates say is deeply problematic.',
        user_id: 2
    },
    {
        post_name: 'This Algorithm Could Ruin Your Life',
        post_data: 'A system used by the Dutch city of Rotterdam attempted to rank people based on their risk of fraud. The results were troubling.',
        user_id: 3
    },
    {
        post_name: 'Immersive Video Games Are Coming to a Theater Near You',
        post_data: 'The founder of Tough Mudders next venture is the Interactive Gamebox, affectionately called "a theme park in a box."',
        user_id: 4
    },
    {
        post_name: 'Why the Floppy Disk Just Won’t Die',
        post_data: 'A surprising number of industries, from embroidery to aviation, still use floppy disks. But the supply is finally running out.',
        user_id: 5
    },
]

const postSeed = () => Post.bulkCreate(posts)

module.exports = postSeed